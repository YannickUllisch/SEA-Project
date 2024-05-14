import { db } from '@main/helpers/db'
import { Questionnaire } from '../Questionnaire/Questionnaire'

export class Experiment {
  private title: string
  private description: string
  private id: string

  constructor(title: string, description: string, id: string) {
    this.title = title
    this.description = description
    this.setQuestionnaires(id)
  }

  private async setQuestionnaires(experimentId: string) {
    const _experimentQuestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId,
      },
    })
    const _test = new Questionnaire(experimentId)
  }

  public getQuestionnaires() {
    return 0
  }

  public getExperimentId() {
    return this.id
  }

  public getExperimentTitle() {
    return this.title
  }

  public getExperimentDesc() {
    return this.description
  }
}
