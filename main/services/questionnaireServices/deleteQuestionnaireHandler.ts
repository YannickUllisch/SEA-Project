import { ipcMain } from 'electron'
import { Session } from '@main/models/Session'

// Handle deleting a questionnaire
ipcMain.on(
  'deleteQuestionnaire',
  async (event, arg: { questionnaireID: string; experimentID: string }) => {
    try {
      // Check if the user has permission to delete a questionnaire
      if (Session.getSession().getUser().getUserRole() > 1) {
        event.reply(
          'failDeleteQuestionnaire',
          'You do not have permission to delete this questionnaire',
        )
        return
      }

      const experiment = Session.getSession()
        .getUser()
        .getExperimentManager()
        .getExperimentById(arg.experimentID)

      await experiment
        .getQuestionnaireManager()
        .deleteQuestionnaire(arg.questionnaireID)

      event.reply('deletedQuestionnaire', 'Questionnaire deleted successfully')
    } catch (error) {
      console.error('Error deleting questionnaire:', error)
      event.reply('failDeleteQuestionnaire', 'Error deleting questionnaire')
    }
  },
)
