import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

// Handle deleting a questionnaire
ipcMain.on(
  'deleteQuestionnaire',
  async (event, arg: { questionnaireID: string }) => {
    try {
      // Check if the user has permission to delete a questionnaire
      if (Session.getSession().getUser().role > 1) {
        event.reply(
          'failDeleteQuestionnaire',
          'You do not have permission to delete this questionnaire',
        )
        return
      }

      // Delete the questionnaire
      await db.dbQuestionnaire.delete({
        where: { id: arg.questionnaireID },
      })

      event.reply('deletedQuestionnaire', 'Questionnaire deleted successfully')
    } catch (error) {
      console.error('Error deleting questionnaire:', error)
      event.reply('failDeleteQuestionnaire', 'Error deleting questionnaire')
    }
  },
)
