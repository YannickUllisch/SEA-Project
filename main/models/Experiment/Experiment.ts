import type { iQuestionnaireQuestion } from '@main/models/Experiment/iQuestionnaireQuestion'

export class Experiment implements iQuestionnaireQuestion {
  name: string

  constructor(name: string) {
    this.name = name
  }
}
