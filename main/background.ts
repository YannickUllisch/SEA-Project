import '@main/services/authHandler'
import '@main/services/messageHandler'
import '@main/services/appServices'
import { ElectronApp } from '@main/models/ElectronApp'
import { Experiment } from './models/Experiment/Experiment'

const main = async () => {
  // Initializing App Window
  const _app = new ElectronApp()

  // Implement main behaviour for backend here
  const test = new Experiment()
  test.name = 'TestName'
}

main()
