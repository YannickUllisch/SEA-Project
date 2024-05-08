import { app, ipcMain } from 'electron'
import path, { join } from 'node:path'
import Database from 'better-sqlite3'

const isProd = process.env.NODE_ENV === 'production'

const dbPath = !isProd
  ? join(__dirname, '../prisma/database.db')
  : path.join(process.resourcesPath, './prisma/database.db')

const db = new Database(dbPath)
//db.pragma('journal_mode = WAL')

const row = db.prepare('SELECT * FROM User').all()
ipcMain.on('message', async (event, _arg) => {
  event.reply('message', row.entries.toString())
})
