import { PrismaClient } from '@prisma/client'
import { app } from 'electron'
import path, { join } from 'node:path'
import fs from 'node:fs'

declare global {
  var prisma: PrismaClient | undefined
}

const isProd = process.env.NODE_ENV === 'production'

const dbPath = !isProd
  ? join(__dirname, '../prisma/database.db')
  : path.join(app.getPath('userData'), 'database.db')

if (isProd) {
  try {
    // database file does not exist, need to create
    fs.copyFileSync(
      join(process.resourcesPath, 'prisma/database.db'),
      dbPath,
      fs.constants.COPYFILE_EXCL,
    )
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Failed creating sqlite file.', err)
    }
  }
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  })

if (!isProd) globalThis.prisma = db
