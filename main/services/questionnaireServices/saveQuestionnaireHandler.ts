import { ipcMain } from 'electron'
import { QuestionnaireManager } from '@main/models/Questionnaire/QuestionnaireManager'

// Handle saving a questionnaire
ipcMain.on(
  'saveQuestionnaire',
  async (
    event,
    arg: {
      experimentID: string
      questionnaireID: string
      questionnaireAnswerData: JSON
      age: number
      gender: string
      country: string
    },
  ) => {
    try {
      const questionnaireManager = new QuestionnaireManager(arg.experimentID)
      // Weird fix to the 'setQuestionnaire' function inside the manager not being finished before the rest is called.
      // Without this it cant do getQuestionnaireById since the obj array is empty
      await questionnaireManager.setQuestionnaires()

      // Saving questionaire answer directly inside of the corresponding questionnaire
      await questionnaireManager
        .getQuestionnaireById(arg.questionnaireID)
        .saveQuestionnaireAnswer(
          arg.questionnaireAnswerData,
          arg.age,
          arg.gender,
          arg.country,
        )
      event.reply('saveQuestionnaire', 'Questionnaire saved successfully')
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      event.reply('failSaveQuestionnaire', 'Error saving questionnaire')
    }
  },
)
