import { ipcMain } from 'electron'
import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'

ipcMain.on('deleteAdmins', async (event, arg: { userID: string }) => {
  if (Session.getSession().getUser().getUserRole() !== 0) {
    event.reply('failDeleteAdmin', 'You do not have permission to delete this')
    return
  }
  try {
    await db.dbUser.delete({
      where: {
        id: arg.userID,
      },
    })
    event.reply('deletedAdmin', 'Admin Deleted')
  } catch (error) {
    console.error(error)
    event.reply('failDeleteAdmin', 'Failed to delete admin')
  }
})
