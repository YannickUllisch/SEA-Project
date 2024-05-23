import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { QuestionnaireManager } from '@main/models/Questionnaire/QuestionnaireManager'

// Handle saving a questionnaire
ipcMain.on(
  'saveQuestionnaire',
  async (
    event,
    arg: {
      questionnaireID: string
      questionnaireAnswerData: JSON
    },
  ) => {
    try {
      const questionnaireManager = new QuestionnaireManager(arg.questionnaireID)

      questionnaireManager.saveQuestionnaire(arg.questionnaireAnswerData)

      event.reply('saveQuestionnaire', 'Questionnaire saved successfully')
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      event.reply('failSaveQuestionnaire', 'Error saving questionnaire')
    }
  },
)

ipcMain.on(
  'saveQuestionnaireResults',
  async (event, { questionnaireId, results }) => {
    try {
      // Check if the questionnaire exists
      const questionnaireExists = await db.dbQuestionnaire.findUnique({
        where: { id: questionnaireId },
      })

      if (!questionnaireExists) {
        console.error('Invalid questionnaire ID')
        return
      }

      // Save the results in the database
      await db.dbQuestionnaireAnswers.create({
        data: {
          questionnaireId: questionnaireId,
          answers: JSON.stringify(results), // Storing answers as a JSON string
        },
      })

      console.log('Results saved successfully')
    } catch (error) {
      console.error('Failed to save results:', error.message)
    }
  },
)
