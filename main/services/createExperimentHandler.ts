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

    if (Session.getSession().getUser().role === 1) {
      event.reply('failCreateExperiment', 'You do not have permission for this')
      return
    }

    await db.experiment.create({
      data: {
        title: arg.title,
        description: arg.description,
        user: { connect: Session.getSession().getUser() },
      },
    })

    event.reply('createdExperiment', 'Experiment Created')
    return
  },
)
