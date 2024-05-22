import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { ipcMain } from 'electron'

ipcMain.on(
  'getQuestionnaires',
  async (event, arg: { experimentID: string }) => {
    try {
      const questionnaires = await db.dbQuestionnaire.findMany({
        where: { experimentId: arg.experimentID },
      })

      const objToReturn = questionnaires.map((q) => ({
        id: q.id,
        form: q.form,
        version: q.version,
      }))

      event.reply('getQuestionnaires', objToReturn)
    } catch (error) {
      console.error('Error fetching questionnaires:', error)
      event.reply('failGetQuestionnaires', 'Error fetching questionnaires')
    }
  },
)
