import { ipcMain } from 'electron'
import { QuestionnaireManager } from '@main/models/Questionnaire/QuestionnaireManager'

// Authenticate
ipcMain.on(
  'initRandomQuestionnaire',
  async (event, arg: { experimentID: string }) => {
    // We create a new QuestionnaireManager since the usual one isnt defined when a session is not existing
    const manager = new QuestionnaireManager(arg.experimentID)

    const randomQuestionnaire = await manager.initRdmQuestionnaire()

    // Returning for frontend with type 'FrontendQuestionnaire' found in types.ts
    event.reply('initRandomQuestionnaire', randomQuestionnaire)
    return
  },
)
