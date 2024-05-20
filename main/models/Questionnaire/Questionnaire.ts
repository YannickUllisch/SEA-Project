import { db } from '@main/helpers/db'
import type { iQuestionnaire } from './iQuestionnaire'

export class Questionnaire implements iQuestionnaire {
  private id: string
  private form: string // string form of the JSON, we can always convert it back later

  constructor(questionnaireId: string, form: string) {
    this.id = questionnaireId
    this.form = form
  }

  public getQuestionnaireId() {
    return this.id
  }

  public getQuestionnaireForm() {
    return this.form
  }

  public async updateQuestionnaireForm(newJSON: JSON) {
    this.form = JSON.stringify(newJSON)

    await db.dbQuestionnaire.update({
      where: {
        id: this.id,
      },
      data: {
        form: JSON.stringify(newJSON),
      },
    })
  }
}
