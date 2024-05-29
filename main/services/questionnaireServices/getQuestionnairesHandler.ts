import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on(
  'getQuestionnaires',
  async (event, arg: { experimentID: string }) => {
    const questionnaireObjects = await Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)
      .getQuestionnaireManager()
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
    const questionnaire = Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)
      .getQuestionnaireManager()
      .getQuestionnaireById(arg.idQuestionnaire)

    const form = questionnaire.getQuestionnaireInfo().form

    // Reply with the matching questionnaire or an empty array if no match found
    event.reply('getQuestionnaire', form)
  },
)
