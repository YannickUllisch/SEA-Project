import '@main/services/authHandler'
import '@main/services/messageHandler'
import '@main/services/getExperimentHandler'
import '@main/services/appServices'
import { ElectronApp } from '@main/models/ElectronApp'

const main = async () => {
  // Initializing App Window
  new ElectronApp()

  // We think of making the session a global singleton, such that when authenticated we initialize a session
  // Which then is the entry point to everything in the backend. (Check out session.ts file)
}

main()
