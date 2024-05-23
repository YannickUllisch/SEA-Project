import { db } from '@main/helpers/db'

export class QuestionnaireManager {
  private id: string

  constructor(questionnaireId: string) {
    this.id = questionnaireId
  }
}
