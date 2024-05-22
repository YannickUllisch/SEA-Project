import { ipcMain } from 'electron'
import { Session } from '@main/models/Session'

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
      const authenticatedUser = await Session.authenticate(
        arg.username,
        arg.password,
      )

      if (authenticatedUser) {
        event.reply('authenticated', authenticatedUser)
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
  Session.getSession().clearSession()
  event.reply('resetSession')
  return
})
