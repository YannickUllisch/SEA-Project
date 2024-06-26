import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getAssistants', async (event, arg: { experimentID: string }) => {
  if (Session.getSession().getUser().getUserRole() > 1) {
    event.reply('failedGetAssistants', 'You do not have permission for this')
    return
  }

  const experiment = Session.getSession()
    .getUser()
    .getExperimentManager()
    .getExperimentById(arg.experimentID)

  const experimentAssistants = await experiment.getExperimentAssistants()

  if (!experimentAssistants) {
    event.reply('failedGetAssistants', 'Error Occurred')
    return
  }

  event.reply('getAssistants', experimentAssistants)
})
