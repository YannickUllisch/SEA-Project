import { db } from '@main/helpers/db'
import { Experiment } from './Experiment'
import type { dbUser } from '@prisma/client'
import { v4 } from 'uuid'

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
        users: { some: { id: userId } },
      },
    })
    const experimentArray = []
    for (const experiment of userExperiments) {
      experimentArray.push(
        new Experiment(
          experiment.title,
          experiment.description,
          experiment.id,
          experiment.restartCode,
        ),
      )
    }
    this.experiments = experimentArray
  }

  // //RESTARTCODE
  // public async restartExperiment(experimentId: string, restartCode: string) {
  //   const experiment = this.getExperimentById(experimentId);
  //   if (!experiment) {
  //     throw new Error('Experiment not found');
  //   }
  //   await experiment.restartExperiment(restartCode);
  // }

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
    restartCode: string,
    description: string,
  ) {
    // We need to create our new ID manually to create a corresponding object aswell
    const newId = v4()
    await db.dbExperiment.create({
      data: {
        id: newId,
        title,
        description,
        restartCode,
        users: { connect: user },
      },
    })

    this.experiments.push(
      new Experiment(title, description, newId, restartCode),
    )
  }

  public async deleteExperiment(experimentId: string) {
    await db.dbExperiment.delete({
      where: {
        id: experimentId,
      },
    })
    this.experiments = this.experiments.filter(
      (experiment) => experiment.getExperimentInfo().id !== experimentId,
    )
  }
}
