import { db } from '@main/helpers/db'
import { QuestionnaireManager } from '../Questionnaire/QuestionnaireManager'

export class Experiment {
  private title: string
  private description: string
  private id: string
  private restartCode: string
  private questionnaireManager: QuestionnaireManager

  constructor(
    title: string,
    description: string,
    id: string,
    restartCode: string,
  ) {
    this.id = id
    this.title = title
    this.questionnaireManager = new QuestionnaireManager(id)
    this.description = description
    this.restartCode = restartCode
  }

  public getExperimentInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      restartCode: this.restartCode,
    }
  }

  public getQuestionnaireManager() {
    return this.questionnaireManager
  }

  public async getExperimentAssistants() {
    try {
      const experimentAssistants = await db.dbUser.findMany({
        where: {
          experiments: { some: { id: this.id } },
          role: 10,
        },
      })

      const userObj: { id: string; username: string; role: number }[] = []

      // Need to convert it to fit 'FrontendUser' type
      for (const assistant of experimentAssistants) {
        userObj.push({
          id: assistant.id,
          username: assistant.name,
          role: assistant.role,
        })
      }
      return userObj
    } catch (err: any) {
      console.error('Failed to fetch experiment assistants', err)
      throw err
    }
  }

  public getRestartCode() {
    return this.restartCode
  }
}
