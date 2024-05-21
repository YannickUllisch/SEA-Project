import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import bcrypt from 'bcryptjs'
import { UserHandler } from '@main/models/User/UserHandler'

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

    try {
      // We create a userHandler Obj to help us authenticate
      const authenticateUser = await new UserHandler().authenticate(
        arg.username,
        arg.password,
      )

      if (authenticateUser) {
        event.reply('authenticated', authenticateUser)
      } else {
        event.reply('authenticate', 'Invalid credentials!')
      }
    } catch (err) {
      event.reply('authenticate', (err as string).toString())
      return
    }
  },
)

// Unauthenticate
ipcMain.on('logout', async (event) => {
  Session.clearSession()
  event.reply('resetSession')
  return
})
