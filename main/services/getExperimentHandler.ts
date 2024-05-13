import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getExperiments', async (event, _arg) => {
  // Fetching experiments for currently logged in user
  const experiments = await db.experiment.findMany({
    where: {
      user: {
        some: {
          id: Session.getSession().getUser().id,
        },
      },
    },
  })

  if (!experiments) {
    event.reply('getExperiments', 'Error occurred!')
    return
  }
  event.reply('getExperiments', experiments)
})
