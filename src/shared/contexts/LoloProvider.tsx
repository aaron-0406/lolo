import { createContext, Dispatch, useContext, useEffect, useState } from 'react'
import { usePersistedState } from '@/hooks/usePersistedState'
import { CityType } from '@/types/dash/city.type'
import { CustomerHasBankType } from '@/types/dash/customer-has-bank'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import { CustomerType } from '@/types/dash/customer.type'
import storage from '../utils/storage'

const appLoloClientStateKey = 'lolo:client'
const appLoloBankStateKey = 'lolo:bank'
const appLoloCityStateKey = 'lolo:city'
const appLoloUserStateKey = 'lolo:user'
const appLoloUserLoggedInStateKey = 'lolo:user:logged:in'
const appLoloSelectedBankStateKey = 'lolo:selected:bank'

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

  const [selectedBankState, setSelectedBankState] = usePersistedState(appLoloSelectedBankStateKey, {
    idBank: '',
    idCHB: '',
  })

  const [user, setUser] = usePersistedState(appLoloUserLoggedInStateKey, initialCustomerUserState)

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

  const setSelectedBank = (selectedBank: SelectedBankType) => {
    setSelectedBankState(selectedBank)
  }

  const clearAll = () => {
    setBanksState([])
    setCitiesState([])
    setUsersState([])
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
        clearAll,
      }}
    >
      {children}
    </LoloContext.Provider>
  )
}
