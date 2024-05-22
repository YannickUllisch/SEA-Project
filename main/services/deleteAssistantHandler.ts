import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on('deleteAssistant', async (event, arg: { userID: string }) => {
  if (Session.getSession().getUser().getUserRole() > 1) {
    event.reply(
      'failDeleteAssistant',
      'You do not have permission to delete this',
    )
    return
  }
  try {
    await db.dbUser.delete({
      where: {
        id: arg.userID,
      },
    })
    event.reply('deletedAssistant', 'Assistant Deleted')
  } catch (error) {
    console.error(error)
    event.reply('failDeleteAssistant', 'Failed to delete assistant')
  }
})
