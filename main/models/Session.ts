import type { dbExperiment, dbUser } from '@prisma/client'
import { ExperimentManager } from './Experiment/ExperimentManager'

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

  public static initSession(user: dbUser): void {
    if (!Session.instance) {
      Session.instance = new Session()
      Session.instance.user = user
      Session.instance.experimentManager = new ExperimentManager(user.id)
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
