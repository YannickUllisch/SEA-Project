import type { iExperiment } from './iExperiment'

export class Experiment implements iExperiment {
  name: string

  constructor(name: string) {
    this.name = name
  }
}
