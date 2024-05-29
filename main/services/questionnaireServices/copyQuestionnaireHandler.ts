import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on(
  'copyQuestionnaire',
  async (event, arg: { experimentID: string; questionnaireID: string }) => {
    if (Session.getSession().getUser().getUserRole() > 1) {
      event.reply('failedCopy', 'You do not have permission for this')
      return
    }

    const experiment = Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)

    await experiment
      .getQuestionnaireManager()
      .copyQuestionnaireById(arg.questionnaireID)

    event.reply('copyQuestionnaire', 'Questionnaire copied successfully')
  },
)
