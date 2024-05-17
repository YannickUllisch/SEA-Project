import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

// Authenticate
ipcMain.on(
  'addUser',
  async (
    event,
    arg: {
      username: string
      hashedPassword: string
      roleToAdd: number
      experimentId: string
    },
  ) => {
    if (arg.username === '') {
      event.reply('failAddUser', 'Username is required')
      return
    }

    if (Session.getSession().getUser().role > 1) {
      event.reply('failAddUser', 'You do not have permission for this')
      return
    }
    if (Session.getSession().getUser().role >= arg.roleToAdd) {
      event.reply('failAddUser', 'You do not have permission for this')
      return
    }

    await db.dbUser.create({
      data: {
        name: arg.username,
        password: arg.hashedPassword,
        role: arg.roleToAdd,
        experiments: arg.experimentId
          ? { connect: { experimentID: arg.experimentId } }
          : undefined,
      },
    })

    event.reply('addedUser', 'User added')
    return
  },
)
