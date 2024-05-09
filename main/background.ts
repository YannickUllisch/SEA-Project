import '@main/services/authHandler'
import '@main/services/messageHandler'
import '@main/services/appServices'
import { ElectronApp } from '@main/models/ElectronApp'
import { Session } from './models/Session'

const main = async () => {
  // Initializing App Window
  new ElectronApp()

  // We think of making the session a global singleton, such that when authenticated we initialize a session
  // Which then is the entry point to everything in the backend. (Check out session.ts file)
  const _session = Session.getSession()
}

main()
