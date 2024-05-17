import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getAssistants', async (event, arg: { experimentID: string }) => {
  if (Session.getSession().getUser().role > 1) {
    event.reply('failedGetAssistants', 'You do not have permission for this')
  }

  const experimentAssistants = await db.dbUser.findMany({
    where: {
      experiments: { some: { experimentID: arg.experimentID } },
      role: 10,
    },
  })
  if (!experimentAssistants) {
    event.reply('failedGetAssistants', 'Error Occurred')
  }

  event.reply('getAssistants', experimentAssistants)
})
