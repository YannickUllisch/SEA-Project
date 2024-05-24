import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on(
  'createQuestionnaire',
  async (
    event,
    arg: {
      experimentID: string
      experimentStructureData: JSON
      version?: string
    },
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

      Experiment.createQuestionnaire(arg.experimentStructureData, arg.version)

      event.reply('createdQuestionnaire', 'Questionnaire Added')
    } catch (error) {
      console.error('Error creating questionnaire:', error)
      event.reply('failCreateQuestionnaire', 'Error creating questionnaire')
    }
  },
)

ipcMain.on(
  'updateQuestionnaireTitle',
  async (
    event,
    arg: {
      experimentID: string
      questionnaireID: string
      version: string
    },
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

      Experiment.getQuestionnaireById(arg.questionnaireID).setVersion(
        arg.version,
      )

      event.reply('updatedQuestionnaireTitle', 'Title saved')
    } catch (error) {
      console.error('Error creating questionnaire:', error)
      event.reply(
        'failUpdateQuestionnaireTitle',
        'Error creating questionnaire',
      )
    }
  },
)
