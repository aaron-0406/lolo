import { createContext, Dispatch, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { usePersistedState } from '../hooks/usePersistedState'
import { UserAppType } from '../types/user-app'
import storage from '../utils/storage'

const appDashUserStateKey = 'dash:user'

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
  user: {
    users: Array<UserAppType>
    getUser: (userId: number) => UserAppType | undefined
    setUsers: (users: Array<UserAppType>) => void
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
  const [authenticate, setAuthenticate] = useState<boolean>(false)
  const [usersState, setUsersState] = usePersistedState<Array<UserAppType>>(appDashUserStateKey, [])
  const [user, setUser] = useState(initialUserState)

  const getUser = (userId: number) => {
    const user = usersState.find((user) => user.id === userId)
    return user
  }

  const setUsers = (users: Array<UserAppType>) => {
    setUsersState(users)
  }

  const clearAll = () => {
    setUsersState([])
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
        user: {
          users: usersState,
          getUser,
          setUsers: setUsers,
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
