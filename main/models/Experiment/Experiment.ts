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

  public async getExperimentAssistants() {
    const experimentAssistants = await db.dbUser.findMany({
      where: {
        experiments: { some: { experimentID: this.id } },
        role: 10,
      },
    })
    return experimentAssistants
  }
}
