import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on('getQuestionnaire', async (event, arg: { experimentID: string }) => {
  const experimentQuestionnaires = await db.dbQuestionnaire.findMany({
    where: {
      experimentId: arg.experimentID,
    },
  })

  //const questionnaireObjects = Session.getSession().getExperimentManager().getExperimentById(arg.experimentID).getQuestionnaires()

  if (!experimentQuestionnaires) {
    event.reply('failedGetQuestionnaire', 'Error Occurred')
  }

  event.reply('getQuestionnaire', experimentQuestionnaires)
})
