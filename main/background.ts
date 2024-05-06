import path from 'node:path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { join } from 'node:path'
import fs from 'node:fs'
import { PrismaClient } from '@prisma/client'
import { main } from './main'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}
const dbPath = !isProd
  ? join(__dirname, '../prisma/database.db')
  : join(process.resourcesPath, 'prisma/database.db')

if (isProd) {
  // database file does not exist, need to create
  fs.copyFileSync(
    join(process.resourcesPath, 'prisma/database.db'),
    dbPath,
    fs.constants.COPYFILE_EXCL,
  )
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
})
;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Entry point for the main process
main()

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.on(
  'authenticate',
  async (event, arg: { username: string; password: string }) => {
    if (arg.username === '') {
      event.reply('authenticate', 'Username is Required')
      return
    }
    if (arg.password === '') {
      event.reply('authenticate', 'Password is Required')
      return
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        name: arg.username,
      },
    })

    if (!existingUser) {
      event.reply('authenticate', 'Invalid credentials!')
      return
    }

    if (existingUser.password === arg.password) {
      // We authenticate the user
      event.reply('authenticated', { existingUser })
    }
  },
)
