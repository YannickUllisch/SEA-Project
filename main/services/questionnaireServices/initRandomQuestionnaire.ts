import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { QuestionnaireManager } from '@main/models/Questionnaire/QuestionnaireManager'

// Authenticate
ipcMain.on(
  'initRandomQuestionnaire',
  async (event, arg: { experimentID: string }) => {
    // We have to manually query and cant use the object backend logic, since Session will not defined when this is called.
    // This is because we log out the user on questionnaire initialization.
    console.log('Received experiment ID:', arg.experimentID) // Log the received ID
    const dbquestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: arg.experimentID,
      },
    })

    if (!dbquestionnaires) {
      event.reply('failInitRandomQuestionnaire', 'No questionnaires found')
      return
    }

    const randomIndex =
      dbquestionnaires[Math.floor(Math.random() * dbquestionnaires.length)]

    // Returning for frontend with type 'FrontendQuestionnaire' found in types.ts
    event.reply('initRandomQuestionnaire', {
      id: randomIndex.id,
      form: randomIndex.form,
      version: randomIndex.version,
    })
    return
  },
)

// Handle saving a questionnaire
ipcMain.on(
  'saveQuestionnaire',
  async (
    event,
    arg: {
      questionnaireID: string
      questionnaireAnswerData: JSON
      age: number
      gender: string
      country: string
    },
  ) => {
    try {
      const questionnaireManager = new QuestionnaireManager(arg.questionnaireID)

      questionnaireManager.saveQuestionnaire(
        arg.questionnaireAnswerData,
        arg.age,
        arg.gender,
        arg.country,
      )
      console.log(arg.questionnaireAnswerData, arg.age, arg.gender, arg.country)

      event.reply('saveQuestionnaire', 'Questionnaire saved successfully')
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      event.reply('failSaveQuestionnaire', 'Error saving questionnaire')
    }
  },
)
