import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

// Authenticate
ipcMain.on(
  'createQuestionnaire',
  async (
    event,
    arg: { experimentID: string; experimentStructureData: JSON },
  ) => {
    if (Session.getSession().getUser().role > 1) {
      event.reply(
        'failCreateQuestionnaire',
        'You do not have permission for this',
      )
      return
    }

    // const associatedUser = await db.dbUser.findUnique({
    //   where: {
    //     id: Session.getSession().getUser().id,
    //   },
    // })

    const Experiment = Session.getSession()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)

    Experiment.createQuestionnaire(arg.experimentStructureData)

    event.reply('createdExperiment', 'Experiment Created')
    return
  },
)
