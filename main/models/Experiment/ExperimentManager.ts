import { db } from '@main/helpers/db'
import { Experiment } from './Experiment'
import type { dbExperiment, dbUser } from '@prisma/client'

export class ExperimentManager {
  private experiments: Experiment[]

  constructor(userId: string) {
    this.setExperiments(userId)
  }

  // Once a user logs in we should set this to all the user specific experiments from the db.
  // We transform the entries from the DB table to Experiment Class objects.
  private async setExperiments(userId: string) {
    const userExperiments = await db.dbExperiment.findMany({
      where: {
        user: { some: { id: userId } },
      },
    })

    for (const experiment of userExperiments) {
      this.experiments.push(new Experiment(experiment.title))
    }
  }

  public getExperiments() {
    return this.experiments
  }
}
