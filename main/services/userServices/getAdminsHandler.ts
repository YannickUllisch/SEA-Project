import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getAdmins', async (event, _arg) => {
  if (Session.getSession().getUser().getUserRole() !== 0) {
    event.reply('failedGetAdmins', 'You do not have permission for this')
    return
  }

  const admins = await db.dbUser.findMany({
    where: {
      role: 1,
    },
  })
  if (!admins) {
    event.reply('failedGetAdmins', 'Error Occurred')
    return
  }

  event.reply('getAdmins', admins)
})
