import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getExperiments', async (event, _arg) => {
  // Fetching experiments for currently logged in user
  const experiments = await Session.getSession()
    .getExperimentManager()
    .getExperiments()

  const frontEndExperiments: {
    id: string
    title: string
    description: string
  }[] = []

  for (const experiment of experiments) {
    frontEndExperiments.push({
      id: experiment.getExperimentId(),
      title: experiment.getExperimentTitle(),
      description: experiment.getExperimentDesc(),
    })
  }

  if (!experiments) {
    event.reply('getExperiments', 'Error occurred!')
    return
  }
  event.reply('getExperiments', experiments)
})
