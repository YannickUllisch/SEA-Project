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
      if (Session.getSession().getUser().getUserRole() > 1) {
        event.reply(
          'failCreateQuestionnaire',
          'You do not have permission for this',
        )
        return
      }

      const Experiment = Session.getSession()
        .getUser()
        .getExperimentManager()
        .getExperimentById(arg.experimentID)

      Experiment.createQuestionnaire(arg.experimentStructureData)

      event.reply('createdQuestionnaire', 'Questionnaire Added')
    } catch (error) {
      console.error('Error creating questionnaire:', error)
      event.reply('failCreateQuestionnaire', 'Error creating questionnaire')
    }
  },
)
