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
