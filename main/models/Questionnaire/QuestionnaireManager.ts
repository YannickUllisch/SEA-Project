import { db } from '@main/helpers/db'

export class QuestionnaireManager {
  private id: string

  constructor(questionnaireId: string) {
    this.id = questionnaireId
  }

  public async saveQuestionnaire(questionnaireData: JSON) {
    console.log('Here at manager')
    try {
      //const newId = v4()
      await db.dbQuestionnaireAnswers.create({
        data: {
          questionnaireId: this.id,
          answers: JSON.stringify(questionnaireData),
        },
      })
    } catch (error) {
      console.error('Failed to save questionnaire:', error)
      throw error
    }
  }
}
