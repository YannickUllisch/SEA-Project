import { db } from '@main/helpers/db'

export class QuestionnaireManager {
  private id: string

  constructor(questionnaireId: string) {
    this.id = questionnaireId
  }

  public async saveQuestionnaire(
    questionnaireData: JSON,
    age: number,
    gender: string,
    country: string,
  ) {
    console.log('Here at manager')
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
