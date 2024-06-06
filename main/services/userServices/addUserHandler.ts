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
    if (arg.roleToAdd !== 1 && arg.roleToAdd !== 10) {
      event.reply('failAddUser', 'Invalid Role')
      return
    }

    if (arg.username === '') {
      event.reply('failAddUser', 'Username is required')
      return
    }

    if (Session.getSession().getUser().getUserRole() > 1) {
      event.reply('failAddUser', 'You do not have permission for this')
      return
    }
    if (Session.getSession().getUser().getUserRole() >= arg.roleToAdd) {
      event.reply('failAddUser', 'You do not have permission for this')
      return
    }

    try {
      const existingUser = await db.dbUser.findFirst({
        where: {
          name: arg.username,
        },
      })

      if (existingUser) {
        event.reply(
          'failAddUser',
          'Please choose a different name for your user',
        )
        return
      }

      await Session.getSession()
        .getUser()
        .handleAddUser(
          arg.username,
          arg.hashedPassword,
          arg.roleToAdd,
          arg.experimentId,
        )

      // Determine if an assistant is being added or a regular user
      if (arg.roleToAdd === 10) {
        event.reply('addedAssistant', 'Assistant Added')
      } else {
        event.reply('addedAdmin', 'Admin added')
      }
    } catch (error) {
      console.error(error)
      event.reply('failAddUser', 'Failed to add user')
    }
  },
)
