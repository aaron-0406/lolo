import { createContext, Dispatch, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { usePersistedState } from '@/hooks/usePersistedState'
import { CityType } from '@/types/dash/city.type'
import { CustomerHasBankType } from '@/types/dash/customer-has-bank'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import { CustomerType } from '@/types/dash/customer.type'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { ManagementActionType } from '@/types/extrajudicial/management-action.type'
import storage from '../utils/storage'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'

const appLoloClientStateKey = 'lolo:client'
const appLoloBankStateKey = 'lolo:bank'
const appLoloCityStateKey = 'lolo:city'
const appLoloUserStateKey = 'lolo:user'
const appLoloFuncionarioStateKey = 'lolo:funcionario'
const appLoloManagementActionStateKey = 'lolo:management:action'
const appLoloNegotiationStateKey = 'lolo:negotiation'
const appLoloSelectedBankStateKey = 'lolo:selected:bank'

const appLoloJudicialCourtStateKey = 'lolo:judicial:court'
const appLoloJudicialSubjectStateKey = 'lolo:judicial:subject'
const appLoloJudicialProceduralWayStateKey = 'lolo:judicial:procedural-way'

type SelectedBankType = {
  idBank: string
  idCHB: string
}

const initialCustomerState: CustomerType = {
  id: 0,
  ruc: '',
  companyName: '',
  urlIdentifier: '',
  state: false,
  customerBanks: [],
}

const initialCustomerUserState: Omit<CustomerUserType, 'password'> = {
  createdAt: new Date(),
  customerId: 0,
  dni: '',
  email: '',
  id: 0,
  lastName: '',
  name: '',
  phone: '',
  state: false,
  roleId: 0,
  role: {
    id: 0,
    name: '',
    customerId: 0,
    permissions: [],
  },
}

export const LoloContext = createContext<{
  client: {
    customer: CustomerType
    setCustomer: (customer: CustomerType) => void
  }
  bank: {
    banks: Array<CustomerHasBankType>
    setBanks: (banks: Array<CustomerHasBankType>) => void
    selectedBank: SelectedBankType
    setSelectedBank: (selectedBank: SelectedBankType) => void
  }
  city: {
    cities: Array<CityType>
    setCities: (cities: Array<CityType>) => void
  }
  user: {
    users: Array<CustomerUserType>
    getUser: (userId: number) => CustomerUserType | undefined
    setUsers: (users: Array<CustomerUserType>) => void
  }
  auth: {
    authenticate: boolean
    setAuthenticate: Dispatch<boolean>
  }
  customerUser: {
    user: Omit<CustomerUserType, 'password'>
    setUser: Dispatch<CustomerUserType>
  }
  judicial: {
    judicialCourt: {
      judicialCourts: Array<JudicialCourtType>
      setJudicialCourts: (judicialCourts: Array<JudicialCourtType>) => void
    }
    judicialSubject: {
      judicialSubjects: Array<JudicialSubjectType>
      setJudicialSubjects: (judicialSubjects: Array<JudicialSubjectType>) => void
    }
    judicialProceduralWay: {
      judicialProceduralWays: Array<JudicialProceduralWayType>
      setJudicialProceduralWays: (judicialProceduralWays: Array<JudicialProceduralWayType>) => void
    }
  }
  extrajudicial: {
    funcionario: {
      funcionarios: Array<FuncionarioType>
      setFuncionarios: (funcionarios: Array<FuncionarioType>) => void
    }
    managementAction: {
      managementActions: Array<ManagementActionType>
      setManagementActions: (managementActions: Array<ManagementActionType>) => void
    }
    negociacion: {
      negociaciones: Array<NegotiationType>
      setNegociaciones: (negociaciones: Array<NegotiationType>) => void
    }
  }
  clearAll: () => void
} | null>(null)

export const useLoloContext = () => {
  const context = useContext(LoloContext)

  if (context === null) {
    throw new Error('useLoloContext must be used within a LoloProvider')
  }

  return context
}

type LoloProviderProps = {
  children: React.ReactNode
}

export const LoloProvider: React.FC<LoloProviderProps> = ({ children }) => {
  const [customerState, setCustomerState] = usePersistedState(appLoloClientStateKey, initialCustomerState)

  const [banksState, setBanksState] = usePersistedState<Array<CustomerHasBankType>>(appLoloBankStateKey, [])

  const [citiesState, setCitiesState] = usePersistedState<Array<CityType>>(appLoloCityStateKey, [])

  const [usersState, setUsersState] = usePersistedState<Array<CustomerUserType>>(appLoloUserStateKey, [])

  const [funcionariosState, setFuncionariosState] = usePersistedState<Array<FuncionarioType>>(
    appLoloFuncionarioStateKey,
    []
  )

  const [managementActionsState, setManagementActionsState] = usePersistedState<Array<ManagementActionType>>(
    appLoloManagementActionStateKey,
    []
  )

  const [negociacionesState, setNegociacionesState] = usePersistedState<Array<NegotiationType>>(
    appLoloNegotiationStateKey,
    []
  )

  const [judicialCourtsState, setJudicialCourtsState] = usePersistedState<Array<JudicialCourtType>>(
    appLoloJudicialCourtStateKey,
    []
  )

  const [judicialSubjectsState, setJudicialSubjectsState] = usePersistedState<Array<JudicialSubjectType>>(
    appLoloJudicialSubjectStateKey,
    []
  )

  const [judicialProceduralWaysState, setJudicialProceduralWaysState] = usePersistedState<
    Array<JudicialProceduralWayType>
  >(appLoloJudicialProceduralWayStateKey, [])

  const [selectedBankState, setSelectedBankState] = usePersistedState(appLoloSelectedBankStateKey, {
    idBank: '',
    idCHB: '',
  })

  const [user, setUser] = useState(initialCustomerUserState)

  const [authenticate, setAuthenticate] = useState<boolean>(storage.get<string>('token') ? true : false)

  const getUser = (userId: number) => {
    const user = usersState.find((user) => user.id === userId)
    return user
  }

  const setCustomer = (customer: CustomerType) => {
    setCustomerState(customer)
  }

  const setBanks = (banks: Array<CustomerHasBankType>) => {
    setBanksState(banks)
  }

  const setCities = (cities: Array<CityType>) => {
    setCitiesState(cities)
  }

  const setUsers = (users: Array<CustomerUserType>) => {
    setUsersState(users)
  }

  const setFuncionarios = (funcionarios: Array<FuncionarioType>) => {
    setFuncionariosState(funcionarios)
  }

  const setManagementActions = (managementActions: Array<ManagementActionType>) => {
    setManagementActionsState(managementActions)
  }

  const setNegociaciones = (negociaciones: Array<NegotiationType>) => {
    setNegociacionesState(negociaciones)
  }

  const setJudicialCourts = (courts: Array<JudicialCourtType>) => {
    setJudicialCourtsState(courts)
  }

  const setJudicialSubjects = (subjects: Array<JudicialSubjectType>) => {
    setJudicialSubjectsState(subjects)
  }

  const setJudicialProceduralWays = (proceduralWays: Array<JudicialProceduralWayType>) => {
    setJudicialProceduralWaysState(proceduralWays)
  }

  const setSelectedBank = (selectedBank: SelectedBankType) => {
    setSelectedBankState(selectedBank)
  }

  const clearAll = () => {
    setBanksState([])
    setCitiesState([])
    setUsersState([])
    setFuncionariosState([])
    setManagementActions([])
    setNegociacionesState([])
    setSelectedBankState({
      idBank: '',
      idCHB: '',
    })
    setAuthenticate(false)
  }

  useEffect(() => {
    const token = storage.get<string>('token')
    if (token) {
      storage.remove('dash:token')

      try {
        const usuario = jwtDecode<CustomerUserType>(token)
        setUser(usuario)
        setAuthenticate(true)
        return
      } catch (error) {}
    }

    setAuthenticate(false)
    setUser(initialCustomerUserState)
  }, [])

  return (
    <LoloContext.Provider
      value={{
        client: {
          customer: customerState,
          setCustomer,
        },
        bank: {
          banks: banksState,
          setBanks,
          selectedBank: selectedBankState,
          setSelectedBank,
        },
        city: {
          cities: citiesState,
          setCities: setCities,
        },
        user: {
          users: usersState,
          getUser,
          setUsers: setUsers,
        },
        auth: {
          authenticate,
          setAuthenticate,
        },
        customerUser: {
          user,
          setUser,
        },
        extrajudicial: {
          funcionario: {
            funcionarios: funcionariosState,
            setFuncionarios: setFuncionarios,
          },
          managementAction: {
            managementActions: managementActionsState,
            setManagementActions: setManagementActions,
          },
          negociacion: {
            negociaciones: negociacionesState,
            setNegociaciones: setNegociaciones,
          },
        },
        judicial: {
          judicialCourt: {
            judicialCourts: judicialCourtsState,
            setJudicialCourts: setJudicialCourts,
          },
          judicialSubject: {
            judicialSubjects: judicialSubjectsState,
            setJudicialSubjects: setJudicialSubjects,
          },
          judicialProceduralWay: {
            judicialProceduralWays: judicialProceduralWaysState,
            setJudicialProceduralWays: setJudicialProceduralWays,
          },
        },
        clearAll,
      }}
    >
      {children}
    </LoloContext.Provider>
  )
}
