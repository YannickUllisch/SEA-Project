import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getQuestionnaire', async (event, arg: { experimentID: string }) => {
  const experimentQuestionnaires = await db.dbExperiment.findMany({
    where: {
      questionnaireID: { some: { id: arg.experimentID } },
    },
  })
  if (!experimentQuestionnaires) {
    event.reply('failedGetQuestionnaire', 'Error Occurred')
  }

  event.reply('getQuestionnaire', experimentQuestionnaires)
})
