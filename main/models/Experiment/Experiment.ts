import type { iExperiment } from '@models/Experiment/iExperiment'

export class Experiment implements iExperiment {
  name: string

  constructor(name: string) {
    this.name = name
  }
}
