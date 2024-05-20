import { db } from '@main/helpers/db'
import { Questionnaire } from '../Questionnaire/Questionnaire'

export class Experiment {
  private title: string
  private description: string
  private id: string

  constructor(title: string, description: string, id: string) {
    this.id = id
    this.title = title
    this.description = description
    this.setQuestionnaires()
  }

  private async setQuestionnaires() {
    const _experimentQuestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: this.id,
      },
    })
    const _test = new Questionnaire(this.id)
  }

  public getQuestionnaires() {
    return 0
  }

  public getExperimentInfo() {
    return { id: this.id, title: this.title, description: this.description }
  }

  public async createQuestionnaire(questionnaireData: JSON) {
    try {
      await db.dbQuestionnaire.create({
        data: {
          experimentId: this.id,
          form: JSON.stringify(questionnaireData),
        },
      })
    } catch (error) {
      console.error('Failed to create questionnaire:', error)
      // Optionally, you can throw the error to be handled by the caller
      throw error
    }
  }

  public async getExperimentAssistants() {
    const experimentAssistants = await db.dbUser.findMany({
      where: {
        experiments: { some: { id: this.id } },
        role: 10,
      },
    })
    return experimentAssistants
  }
}
