import { db } from '@main/helpers/db'
import { QuestionnaireAnswer } from './QuestionnaireAnswer'

export class Questionnaire {
  private id: string
  private form: string // string form of the JSON, we can always convert it back later
  private version: string
  private answers: QuestionnaireAnswer[]

  constructor(questionnaireId: string, form: string, version?: string) {
    this.id = questionnaireId
    this.answers = []
    this.form = form
    this.version = version
    this.setAnswers()
  }

  public async setAnswers() {
    try {
      const dbAnswers = await db.dbQuestionnaireAnswers.findMany({
        where: {
          questionnaireId: this.id,
        },
      })

      // Setting the objects questionnaires equal to the imported db questionnaires
      const answerArray = []
      for (const answer of dbAnswers) {
        answerArray.push(
          new QuestionnaireAnswer(
            answer.age,
            answer.gender,
            answer.country,
            answer.answers,
          ),
        )
      }
      this.answers = answerArray
    } catch (err) {
      console.error(err)
    }
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
    answer: JSON,
    age: number,
    gender: string,
    country: string,
  ) {
    try {
      this.answers.push(
        new QuestionnaireAnswer(age, gender, country, JSON.stringify(answer)),
      )
      await db.dbQuestionnaireAnswers.create({
        data: {
          questionnaireId: this.id,
          answers: JSON.stringify(answer),
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
