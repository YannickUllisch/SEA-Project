import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getAdmins', async (event, _arg) => {
  if (Session.getSession().getUser().getUserRole() === 0) {
    event.reply('failedGetAdmins', 'You do not have permission for this')
  }

  const experimentAssistants = await db.dbUser.findMany({
    where: {
      role: 1,
    },
  })
  if (!experimentAssistants) {
    event.reply('failedGetAdmins', 'Error Occurred')
  }

  event.reply('getAdmins', experimentAssistants)
})
