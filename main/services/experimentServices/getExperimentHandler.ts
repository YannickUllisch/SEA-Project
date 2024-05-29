import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getExperiments', async (event, _arg) => {
  // Fetching experiments for currently logged in user
  const experiments = await Session.getSession()
    .getUser()
    .getExperimentManager()
    .getExperiments()

  const frontEndExperiments: {
    id: string
    title: string
    restartCode: string
    description: string
  }[] = []

  for (const experiment of experiments) {
    frontEndExperiments.push(experiment.getExperimentInfo())
  }

  if (!experiments) {
    event.reply('getExperiments', 'Error occurred!')
    return
  }
  event.reply('getExperiments', experiments)
})

ipcMain.on('validateRestartCode', async (event, arg) => {
  const { experimentId, restartCode } = arg

  try {
    const experiment = await db.dbExperiment.findUnique({
      where: { id: experimentId },
    })

    if (
      experiment.restartCode === restartCode &&
      experiment.restartCode !== ''
    ) {
      event.reply('restartCodeValidated', { valid: true })
      //event.reply('noRestartCode', { rCode: false })
    } else if (experiment.restartCode === '') {
      event.reply('restartCodeValidated', { valid: false })
      //event.reply('noRestartCode', { rCode: true })
    } else {
      event.reply('restartCodeValidated', { valid: false })
      //event.reply('noRestartCode', { rCode: false })
    }
  } catch (error) {
    console.error('Error validating restart code:', error)
    event.reply('failValidateRestartCode', error.message)
  }
})
