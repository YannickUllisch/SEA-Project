import type { dbUser } from '@prisma/client'
import { ExperimentManager } from './Experiment/ExperimentManager'
import { db } from '@main/helpers/db'
import bcrypt from 'bcryptjs'

// We make Session a singleton

export class Session {
  private static instance: Session | undefined
  private user: dbUser | undefined
  private experimentManager: ExperimentManager | undefined

  private constructor() {}

  public static getSession(): Session {
    if (!Session.instance) {
      throw new Error('Session has not been initialized.')
    }
    return Session.instance
  }

  public static async authenticate(username: string, password: string) {
    const existingUser = await db.dbUser.findFirst({
      where: {
        name: username,
      },
    })

    if (!existingUser) {
      return null
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      // We authenticate the user by both initializing the backend Session (which starts all of the backend logic)
      if (!Session.instance) {
        Session.instance = new Session()
        Session.instance.user = existingUser
        Session.instance.experimentManager = new ExperimentManager(
          existingUser.id,
        )
        // And also send authenticated status to the frontend
        return existingUser
      }
    } else {
      throw new Error('Session already initialized')
    }
  }

  public static clearSession(): void {
    if (Session.instance) {
      Session.instance = undefined
    } else {
      throw new Error('Session has not been initialized.')
    }
  }

  public getUser(): dbUser {
    if (!this.user) {
      throw new Error('Session has not been initialized with a user.')
    }
    return this.user
  }

  public getExperimentManager(): ExperimentManager {
    if (!this.experimentManager) {
      throw new Error('Session has not been initialized with a user.')
    }
    return this.experimentManager
  }
}
