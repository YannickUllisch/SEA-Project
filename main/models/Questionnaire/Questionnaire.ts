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

  public async setVersion(version: string) {
    this.version = version
    await db.dbQuestionnaire.update({
      where: {
        id: this.id,
      },
      data: {
        version,
      },
    })
  }

  public async updateQuestionnaireForm(newJSON: JSON) {
    // Updating locally
    this.form = JSON.stringify(newJSON)

    // Updating in database
    try {
      await db.dbQuestionnaire.update({
        where: {
          id: this.id,
        },
        data: {
          form: JSON.stringify(newJSON),
        },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  public async saveQuestionnaireAnswer(
    questionnaireData: JSON,
    age: number,
    gender: string,
    country: string,
  ) {
    try {
      //const newId = v4()
      await db.dbQuestionnaireAnswers.create({
        data: {
          questionnaireId: this.id,
          answers: JSON.stringify(questionnaireData),
          age,
          gender,
          country,
        },
      })
    } catch (error) {
      console.error('Failed to save questionnaire:', error)
      throw error
    }
  }
}
