import type { dbUser } from '@prisma/client'
import {
  createContext,
  useState,
  useContext,
  type FC,
  type PropsWithChildren,
  useEffect,
} from 'react'
import type { FrontendUser } from '../lib/types'

export interface Session {
  user: FrontendUser
}

// Define a context for your session
const SessionContext = createContext<Session>(null)

// Custom Provider component
const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  // Define state to hold the session object
  const [session, setSession] = useState<Session>(null)

  // In here wait for the backend to send a session back, which only happens on authentication success
  useEffect(() => {
    window.ipc.on('authenticated', (user: FrontendUser) => {
      setSession({ user })
    })
    window.ipc.on('resetSession', () => {
      setSession(null)
    })

    return () => {
      window.ipc.removeAllListeners('authenticated')
      window.ipc.removeAllListeners('resetSession')
    }
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
