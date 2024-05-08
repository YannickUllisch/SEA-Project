import { ipcMain } from 'electron'

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `hello ${arg}`)
})
