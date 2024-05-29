import path from 'node:path'
import { app } from 'electron'
import serve from 'electron-serve'
import { AppWindow } from '@main/models/AppWindow'

export class ElectronApp {
  private isProd: boolean
  public mainWindow: Electron.CrossProcessExports.BrowserWindow

  constructor() {
    this.isProd = process.env.NODE_ENV === 'production'
    this.mainWindow = null
    this.startApp()
  }

  private async startApp() {
    if (this.isProd) {
      serve({ directory: 'app' })
    } else {
      app.setPath('userData', `${app.getPath('userData')} (development)`)
    }

    await app.whenReady()
    this.createMainWindow()
  }

  private createMainWindow() {
    const mainWindowOptions = {
      width: 1000,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
      },
    }

    this.mainWindow = new AppWindow(
      'MainWindow',
      mainWindowOptions,
    ).createWindow()

    if (this.isProd) {
      this.loadProdURL()
    } else {
      this.loadDevURL(process.argv[2])
      this.mainWindow.webContents.openDevTools()
    }
  }

  private async loadProdURL() {
    await this.mainWindow.loadURL('app://./')
  }

  private async loadDevURL(port) {
    await this.mainWindow.loadURL(`http://localhost:${port}/`)
  }
}
