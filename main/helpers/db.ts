import { PrismaClient, type User } from '@prisma/client'
import path, { join } from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'

declare global {
  var prisma: PrismaClient | undefined
}

const isProd = process.env.NODE_ENV === 'production'

const dbPath = !isProd
  ? join(__dirname, '../prisma/database.db')
  : path.join(process.resourcesPath, 'prisma/database.db')

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
