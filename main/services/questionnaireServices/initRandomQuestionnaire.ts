import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'

// Authenticate
ipcMain.on(
  'initRandomQuestionnaire',
  async (event, arg: { experimentID: string }) => {
    // We have to manually query and cant use the object backend logic, since Session will not defined when this is called.
    // This is because we log out the user on questionnaire initialization.
    const dbquesitonnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: arg.experimentID,
      },
    })

    if (!dbquesitonnaires) {
      event.reply('failInitRandomQuestionnaire', 'No questionnaires found')
    }

    const randomIndex =
      dbquesitonnaires[Math.floor(Math.random() * dbquesitonnaires.length)]

    // Returning for frontend with type 'FrontendQuestionnaire' found in types.ts
    event.reply('initRandomQuestionnaire', {
      id: randomIndex.id,
      form: randomIndex.form,
      version: randomIndex.version,
    })
    return
  },
)
