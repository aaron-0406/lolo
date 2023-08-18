import { createContext, Dispatch, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { UserAppType } from '../types/dash/user-app'
import { CustomerType } from '../types/dash/customer.type'
import storage from '../utils/storage'
import { usePersistedState } from '../hooks/usePersistedState'

const appDashSelectedCustomerStateKey = 'dash:customer'

const initialUserState: UserAppType = {
  id: 0,
  code: '',
  dni: '',
  name: '',
  lastName: '',
  address: '',
  phone: '',
  email: '',
  password: '',
  state: false,
  createdAt: new Date(),
}

const initialCustomerState: CustomerType = {
  id: 0,
  ruc: '',
  companyName: '',
  urlIdentifier: '',
  state: false,
  customerBanks: [],
}

export const DashContext = createContext<{
  auth: {
    authenticate: boolean
    setAuthenticate: Dispatch<boolean>
  }
  dashUser: {
    user: UserAppType
    setUser: Dispatch<UserAppType>
  }
  dashCustomer: {
    selectedCustomer: CustomerType
    setSelectedCustomer: Dispatch<CustomerType>
  }
  clearAll: () => void
} | null>(null)

export const useDashContext = () => {
  const context = useContext(DashContext)

  if (context === null) {
    throw new Error('useDashContext must be used within a DashProvider')
  }

  return context
}

type DashProviderProps = {
  children: React.ReactNode
}

export const DashProvider: React.FC<DashProviderProps> = ({ children }) => {
  const [authenticate, setAuthenticate] = useState<boolean>(storage.get<string>('dash:token') ? true : false)
  const [user, setUser] = useState(initialUserState)

  const [selectedCustomerState, setSelectedCustomerState] = usePersistedState<CustomerType>(
    appDashSelectedCustomerStateKey,
    initialCustomerState
  )

  const setSelectedCustomer = (selectedCustomer: CustomerType) => {
    setSelectedCustomerState(selectedCustomer)
  }

  const clearAll = () => {
    setSelectedCustomerState(initialCustomerState)
    setAuthenticate(false)
  }

  useEffect(() => {
    const token = storage.get<string>('dash:token')
    if (token) {
      storage.remove('token')

      try {
        const usuario = jwtDecode<UserAppType>(token)
        setUser(usuario)
        setAuthenticate(true)
        return
      } catch (error) {}
    }

    setAuthenticate(false)
    setUser(initialUserState)
  }, [])

  return (
    <DashContext.Provider
      value={{
        auth: {
          authenticate,
          setAuthenticate,
        },
        dashUser: {
          user,
          setUser,
        },
        dashCustomer: {
          selectedCustomer: selectedCustomerState,
          setSelectedCustomer,
        },
        clearAll,
      }}
    >
      {children}
    </DashContext.Provider>
  )
}
