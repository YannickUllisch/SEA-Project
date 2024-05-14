import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on('deleteAssistant', async (event, arg: { userID: string }) => {
  if (Session.getSession().getUser().role > 1) {
    event.reply(
      'failDeleteAssistant',
      'You do not have permission to delete this',
    )
    return
  }

  await db.dbUser.delete({
    where: {
      id: arg.userID,
    },
  })

  event.reply('deletedAssistant', 'Assistant Deleted')
  return
})