import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

// Authenticate
ipcMain.on(
  'createExperiment',
  async (event, arg: { title: string; description: string }) => {
    if (arg.title === '') {
      event.reply('failCreateExperiment', 'Title is required')
      return
    }

    if (Session.getSession().getUser().getUserRole() > 1) {
      event.reply('failCreateExperiment', 'You do not have permission for this')
      return
    }

    const associatedUser = await db.dbUser.findUnique({
      where: {
        id: Session.getSession().getUser().getUserID(),
      },
    })

    Session.getSession()
      .getUser()
      .getExperimentManager()
      .createExperiment(associatedUser, arg.title, arg.description)

    event.reply('createdExperiment', 'Experiment Created')
    return
  },
)
