import type { User } from '@prisma/client'
import {
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren,
  useEffect,
} from 'react'

export interface Session {
  user: User
}

// Define a context for your session
const SessionContext = createContext<Session | null>(null)

// Custom Provider component
const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  // Define state to hold the session object
  const [session, setSession] = useState<Session | null>(null)

  // In here wait for the backend to send a session back, which only happens on authentication success
  useEffect(() => {
    window.ipc.on('authenticated', (user: User) => {
      setSession({ user })
    })
    window.ipc.on('resetSession', () => {
      setSession(null)
    })
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

// Custom hook to access the session context
export const useSession = () => useContext(SessionContext)

export default SessionProvider
