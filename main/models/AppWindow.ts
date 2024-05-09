import {
  BrowserWindow,
  type BrowserWindowConstructorOptions,
  type Rectangle,
  screen,
} from 'electron'
import Store from 'electron-store'

interface WindowState extends Rectangle {
  isMaximized?: boolean
}

export class AppWindow {
  public readonly windowName: string
  private readonly options: BrowserWindowConstructorOptions
  private store: Store<WindowState>
  private defaultSize: Rectangle

  constructor(windowName: string, options: BrowserWindowConstructorOptions) {
    this.windowName = `window-state-${windowName}`
    this.options = options
    this.store = new Store<WindowState>({ name: `window-state-${windowName}` })
    this.defaultSize = {
      x: 0,
      y: 0,
      width: options.width || 800,
      height: options.height || 600,
    }
  }

  private restoreState(): WindowState {
    return this.store.get('window-state', this.defaultSize)
  }

  private getCurrentPosition(win: BrowserWindow): WindowState {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    }
  }

  private windowWithinBounds(
    windowState: WindowState,
    bounds: Rectangle,
  ): boolean {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  private resetToDefaults(): WindowState {
    const bounds = screen.getPrimaryDisplay().bounds
    return Object.assign({}, this.defaultSize, {
      x: (bounds.width - this.defaultSize.width) / 2,
      y: (bounds.height - this.defaultSize.height) / 2,
    })
  }

  private ensureVisibleOnSomeDisplay(windowState: WindowState): WindowState {
    const visible = screen.getAllDisplays().some((display) => {
      return this.windowWithinBounds(windowState, display.bounds)
    })
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return this.resetToDefaults()
    }
    return windowState
  }

  private saveState(win: BrowserWindow): void {
    const state: WindowState = {
      isMaximized: win.isMaximized(),
      ...this.getCurrentPosition(win),
    }
    this.store.set('window-state', state)
  }

  public createWindow(): BrowserWindow {
    const state: WindowState = this.ensureVisibleOnSomeDisplay(
      this.restoreState(),
    )
    const win = new BrowserWindow({
      ...state,
      ...this.options,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        ...(this.options.webPreferences || {}),
      },
    })
    win.on('close', () => this.saveState(win))
    return win
  }
}
