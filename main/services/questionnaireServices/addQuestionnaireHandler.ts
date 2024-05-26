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

ipcMain.on(
  'editQuestionnaire',
  async (
    event,
    arg: {
      experimentID: string
      questionnaireID: string
      experimentStructureData: JSON
      version?: string
    },
  ) => {
    try {
      if (Session.getSession().getUser().getUserRole() > 1) {
        event.reply(
          'failEditQuestionnaire',
          'You do not have permission to edit this questionnaire',
        )
        return
      }

      const Experiment = Session.getSession()
        .getUser()
        .getExperimentManager()
        .getExperimentById(arg.experimentID)

      // Assuming updateQuestionnaire is a method that updates an existing questionnaire
      // by its ID with the new data and version.
      const updateResult = Experiment.updateQuestionnaire(
        arg.questionnaireID,
        arg.experimentStructureData,
        arg.version,
      )

      if (updateResult) {
        event.reply('editedQuestionnaire', 'Questionnaire Updated Successfully')
      } else {
        // Handle the case where update is not successful
        event.reply('failEditQuestionnaire', 'Failed to update questionnaire')
      }
    } catch (error) {
      console.error('Error editing questionnaire:', error)
      event.reply('failEditQuestionnaire', 'Error editing questionnaire')
    }
  },
)
