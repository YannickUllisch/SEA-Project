import type { iQuestionnaire } from './iQuestionnaire'

export class Questionnaire implements iQuestionnaire {
  private id: string
  private name: string
  private description: string
  private form: string
  private experimentId: string

  constructor(experimentId: string) {
    this.experimentId = experimentId
    this.setQuestionnaires()
  }

  private async setQuestionnaires() {
    return 0
  }

  public getQuestionnaireId() {
    return '0'
  }

  public updateQuestionnaireForm() {}
}
