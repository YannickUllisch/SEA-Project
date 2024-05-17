import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import bcrypt from 'bcryptjs'

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
      const existingUser = await db.dbUser.findFirst({
        where: {
          name: arg.username,
        },
        include: {
          experiments: { include: { questionnaireID: true } },
        },
      })

      if (!existingUser) {
        event.reply('authenticate', 'Invalid credentials!')
        return
      }

      if (await bcrypt.compare(arg.password, existingUser.password)) {
        // We authenticate the user by both initializing the backend Session (which starts all of the backend logic)
        Session.initSession(existingUser)
        // And also send authenticated status to the frontend
        event.reply('authenticated', existingUser)
        return
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
