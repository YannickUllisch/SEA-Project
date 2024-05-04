import { db } from '@renderer/src/lib/dbClient'

class ExperimentManager {
  experiments: iExperiment[]

  createExperiment() {
    return 'test'
  }

  private async setExperiments(userId: string) {
    const exp = await db.user.findMany({
      where: {
        id: userId,
      },
    })
    for (const experiment of exp) {
      this.experiments.push({ name: experiment.name })
    }
  }
}
