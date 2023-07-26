import { createContext, Dispatch, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { UserAppType } from '../types/user-app'
import storage from '../utils/storage'

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

export const DashContext = createContext<{
  auth: {
    authenticate: boolean
    setAuthenticate: Dispatch<boolean>
  }
  dashUser: {
    user: UserAppType
    setUser: Dispatch<UserAppType>
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
  const [authenticate, setAuthenticate] = useState<boolean>(storage.get<string>('token') ? true : false)
  const [user, setUser] = useState(initialUserState)

  const clearAll = () => {
    setAuthenticate(false)
  }

  useEffect(() => {
    const token = storage.get<string>('token')
    if (token) {
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
        clearAll,
      }}
    >
      {children}
    </DashContext.Provider>
  )
}
