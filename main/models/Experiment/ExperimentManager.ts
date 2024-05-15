import { db } from '@main/helpers/db'
import { Experiment } from './Experiment'
import type { dbUser } from '@prisma/client'

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
    const experimentArray = []
    for (const experiment of userExperiments) {
      experimentArray.push(
        new Experiment(experiment.title, experiment.description, experiment.id),
      )
    }
    this.experiments = experimentArray
  }

  public async getExperiments() {
    return this.experiments
  }

  public getExperimentById(experimentId: string) {
    for (const experiment of this.experiments) {
      if (experiment.getExperimentInfo().id === experimentId) {
        return experiment
      }
    }
  }

  public async createExperiment(
    user: dbUser,
    title: string,
    description: string,
  ) {
    await db.dbExperiment.create({
      data: {
        title,
        description,
        user: { connect: user },
      },
    })

    // We need to add a new object to this.experiments for it to show up in frontend
  }

  public async deleteExperiment(experimentId: string) {
    await db.dbExperiment.delete({
      where: {
        id: experimentId,
      },
    })

    // Find a better method to remove the experiment object on delete
    this.experiments = this.experiments.filter((experiment) => {
      if (experiment.getExperimentInfo().id !== experimentId) {
        return experiment
      }
    })
  }
}
