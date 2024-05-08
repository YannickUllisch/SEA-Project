import { db } from '@main/helpers/db'
import type { iExperiment } from '@models/Experiment/iExperiment'
import { Experiment } from './Experiment'
import type { User } from '@prisma/client'

export class ExperimentManager {
  private experiments: iExperiment[]

  constructor(loggedInUser: User) {
    this.setExperiments(loggedInUser.id)
  }

  // Once a user logs in we should set this to all the user specific experiments from the db.
  // We transform the entries from the DB table to Experiment Class objects.
  private async setExperiments(userId: string) {
    const userExperiments = await db.survey.findMany({
      where: {
        userId,
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
