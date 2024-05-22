import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on(
  'createQuestionnaire',
  async (
    event,
    arg: { experimentID: string; experimentStructureData: JSON },
  ) => {
    try {
      if (Session.getSession().getUser().role > 1) {
        event.reply(
          'failCreateQuestionnaire',
          'You do not have permission for this',
        )
        return
      }

      const experiment = await db.dbExperiment.findUnique({
        where: { id: arg.experimentID },
      })

      if (!experiment) {
        event.reply('failCreateQuestionnaire', 'Experiment not found')
        return
      }

      await db.dbQuestionnaire.create({
        data: {
          experimentId: arg.experimentID,
          form: JSON.stringify(arg.experimentStructureData),
          version: 'v1', // or any default versioning you prefer
        },
      })

      event.reply('createdQuestionnaire', 'Questionnaire Added')
    } catch (error) {
      console.error('Error creating questionnaire:', error)
      event.reply('failCreateQuestionnaire', 'Error creating questionnaire')
    }
  },
)
