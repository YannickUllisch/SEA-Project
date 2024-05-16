import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on('deleteExperiment', async (event, arg: { id: string }) => {
  if (Session.getSession().getUser().role > 1) {
    event.reply(
      'failDeleteExperiment',
      'You do not have permission to delete this',
    )
    return
  }

  Session.getSession().getExperimentManager().deleteExperiment(arg.id)

  event.reply('deletedExperiment', 'Experiment Deleted')
  return
})
