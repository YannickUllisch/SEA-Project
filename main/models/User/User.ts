import { db } from '@main/helpers/db'
import { ExperimentManager } from '../Experiment/ExperimentManager'

export class User {
  private id: string
  private name: string
  private role: number
  private experimentManager: ExperimentManager

  constructor(id: string, name: string, role: number) {
    this.id = id
    this.name = name
    this.role = role
    this.experimentManager = new ExperimentManager(id)
  }

  public getExperimentManager(): ExperimentManager {
    if (!this.experimentManager) {
      throw new Error('Experiment Manager has not been initialized')
    }
    return this.experimentManager
  }

  public getUserID(): string {
    if (!this.experimentManager) {
      throw new Error('ID does not exist')
    }
    return this.id
  }

  public getUserRole(): number {
    if (!this.experimentManager) {
      throw new Error('Role does not exist')
    }
    return this.role
  }

  public async handleAddUser(
    _name: string,
    _hashedPassword: string,
    role: number,
    experimentId?: string,
  ) {
    // Admin case
    if (role === 1 && this.role < 1) {
      // create new admin
      return true
    }

    // Assistant case, we need experimentId to link added assistant to specific experiment
    if (role === 10 && this.role < role && experimentId) {
      // add new assistant
      return true
    }

    return false
  }
  public async handleDeleteUser(id: string) {
    // We first fetch the user we try to delete for permission checks
    try {
      const user = await db.dbUser.findUnique({
        where: {
          id,
        },
      })

      // Should not be able to delete users of higher or same role
      if (user.role <= this.role) {
        return false
      }

      await db.dbUser.delete({
        where: {
          id,
        },
      })

      return true
    } catch (error) {
      console.error(error)
    }
    return false
  }
}
