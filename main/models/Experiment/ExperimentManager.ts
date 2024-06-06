import { db } from '@main/helpers/db'
import { Experiment } from './Experiment'
import { v4 } from 'uuid'
import type { iExperiment } from './iExperiment'

export class ExperimentManager {
  private experiments: iExperiment[]

  constructor(userId: string) {
    this.experiments = []
    this.setExperiments(userId)
  }

  // Once a user logs in we should set this to all the user specific experiments from the db.
  // We transform the entries from the DB table to Experiment Class objects.
  public async setExperiments(userId: string) {
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
    userId: string,
    title: string,
    restartCode: string,
    description: string,
    id?: string, // needed for testing, since we otherwise cannot delete it again without knowing id
  ) {
    // We need to create our new ID manually to create a corresponding object aswell

    const associatedUser = await db.dbUser.findUnique({
      where: {
        id: userId,
      },
    })
    const newId = id ?? v4()

    this.experiments.push(
      new Experiment(title, description, newId, restartCode),
    )

    try {
      await db.dbExperiment.create({
        data: {
          id: newId,
          title,
          description,
          restartCode,
          users: { connect: associatedUser },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  public async deleteExperiment(experimentId: string) {
    this.experiments = this.experiments.filter(
      (experiment) => experiment.getExperimentInfo().id !== experimentId,
    )
    try {
      await db.dbExperiment.delete({
        where: {
          id: experimentId,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
}
