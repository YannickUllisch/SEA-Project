import { ipcMain } from 'electron'
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

      const questionnaires =
        Experiment.getQuestionnaireManager().getQuestionnaires()

      const existingTitle = questionnaires.find(
        (q) => q.getQuestionnaireInfo().version === arg.version,
      )

      if (existingTitle) {
        event.reply('failCreateQuestionnaire', 'Please choose a unique Title')
        return
      }

      await Experiment.getQuestionnaireManager().createQuestionnaire(
        arg.experimentStructureData,
        arg.version,
      )

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
          'failUpdateQuestionnaireTitle',
          'You do not have permission for this',
        )
        return
      }

      const Experiment = Session.getSession()
        .getUser()
        .getExperimentManager()
        .getExperimentById(arg.experimentID)

      const questionnaires =
        Experiment.getQuestionnaireManager().getQuestionnaires()

      const existingTitle = questionnaires.find(
        (q) => q.getQuestionnaireInfo().version === arg.version,
      )

      if (existingTitle) {
        event.reply(
          'failUpdateQuestionnaireTitle',
          'Please choose a unique Title',
        )
        return
      }

      await Experiment.getQuestionnaireManager()
        .getQuestionnaireById(arg.questionnaireID)
        .setVersion(arg.version)

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

      // Updating the questionnaire form
      await Experiment.getQuestionnaireManager()
        .getQuestionnaireById(arg.questionnaireID)
        .updateQuestionnaireForm(arg.experimentStructureData)

      event.reply('editedQuestionnaire', 'Questionnaire Updated Successfully')
    } catch (error) {
      console.error('Error editing questionnaire:', error)
      event.reply('failEditQuestionnaire', 'Error editing questionnaire')
    }
  },
)
