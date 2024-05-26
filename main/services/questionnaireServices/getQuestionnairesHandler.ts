import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on(
  'getQuestionnaires',
  async (event, arg: { experimentID: string }) => {
    const questionnaireObjects = Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)
      .getQuestionnaires()

    const objToReturn = []

    for (const questionnaire of questionnaireObjects) {
      objToReturn.push(questionnaire.getQuestionnaireInfo())
    }

    event.reply('getQuestionnaires', objToReturn)
  },
)

ipcMain.on(
  'getQuestionnaire',
  async (event, arg: { experimentID: string; idQuestionnaire: string }) => {
    const questionnaireObjects = Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)
      .getQuestionnaires()

    let form = ''

    // Iterate over all questionnaires and add only the one matching the questionnaireID
    for (const questionnaire of questionnaireObjects) {
      const questionnaireInfo = questionnaire.getQuestionnaireInfo()
      if (questionnaireInfo.id === arg.idQuestionnaire) {
        // Check if IDs match
        form = questionnaireInfo.form
        console.log(questionnaireInfo.form)
        console.log(arg.idQuestionnaire)
        break // Since only one questionnaire is expected, break the loop once found
      }
    }

    // Reply with the matching questionnaire or an empty array if no match found
    event.reply('getQuestionnaire', form)
  },
)
