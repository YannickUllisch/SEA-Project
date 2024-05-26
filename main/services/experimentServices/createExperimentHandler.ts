import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

// Authenticate
ipcMain.on('createExperiment', async (event, arg) => {
  const { title, description, restartCode } = arg

  if (title === '') {
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

  try {
    await Session.getSession()
      .getUser()
      .getExperimentManager()
      .createExperiment(associatedUser, title, restartCode, description)

    event.reply('createdExperiment', 'Experiment Created')
  } catch (error) {
    event.reply('failCreateExperiment', error.message)
  }
})
