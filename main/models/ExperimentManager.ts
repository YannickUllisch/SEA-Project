import type { iExperiment } from '@models/Experiment/iExperiment'

class _ExperimentManager {
  experiments: iExperiment[]

  // Once a user logs in we should set this to all the user specific experiments from the db.
  private setExperiments(userId: string) {
    return userId
  }

  createExperiment() {
    return 'test'
  }
}
