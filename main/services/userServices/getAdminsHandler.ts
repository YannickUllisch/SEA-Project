import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getAdmins', async (event, _arg) => {
  if (Session.getSession().getUser().getUserRole() !== 0) {
    event.reply('failedGetAdmins', 'You do not have permission for this')
    return
  }

  // This is just needed to setup basic admins, and not part of the larger functionality needed for this project, hence
  // we just handle it directly throught the database
  const admins = await db.dbUser.findMany({
    where: {
      role: 1,
    },
  })
  const returnObj = []

  // Need to convert it to fit 'FrontendUser' type
  for (const admin of admins) {
    returnObj.push({ id: admin.id, username: admin.name, role: admin.role })
  }
  if (!admins) {
    event.reply('failedGetAdmins', 'Error Occurred')
    return
  }

  event.reply('getAdmins', returnObj)
})

