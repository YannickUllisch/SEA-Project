import { db } from '@main/helpers/db'

export class Questionnaire {
  private id: string
  private form: string // string form of the JSON, we can always convert it back later
  private version: string

  constructor(questionnaireId: string, form: string, version?: string) {
    this.id = questionnaireId
    this.form = form
    this.version = version
  }

  public getQuestionnaireInfo() {
    return { id: this.id, form: this.form, version: this.version }
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
