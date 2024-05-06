import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'

// Authenticate
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

    const existingUser = await db.user.findFirst({
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

// Unauthenticate
ipcMain.on('unauthenticate', async (_event, _arg: { userId: string }) => {})
