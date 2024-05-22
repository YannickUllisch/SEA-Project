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
    this.initiateUser()
  }

  private initiateUser() {
    this.experimentManager = new ExperimentManager(this.id)
  }

  public getExperimentManager(): ExperimentManager {
    if (!this.experimentManager) {
      throw new Error('Experiment Manager has not been initialized')
    }
    return this.experimentManager
  }

  public getUserID(): string {
    return this.id
  }

  public getUserRole(): number {
    return this.role
  }
}
