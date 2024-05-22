import { db } from '@main/helpers/db'
import { Questionnaire } from '../Questionnaire/Questionnaire'
import { v4 } from 'uuid'

export class Experiment {
  private title: string
  private description: string
  private id: string
  private questionnaires: Questionnaire[]

  constructor(title: string, description: string, id: string) {
    this.id = id
    this.title = title
    this.description = description
    this.setQuestionnaires()
  }

  private async setQuestionnaires() {
    const experimentQuestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: this.id,
      },
    })

    // Setting the objects questionnaires equal to the imported db questionnaires
    const questionnaireArray = []
    for (const questionnaire of experimentQuestionnaires) {
      questionnaireArray.push(
        new Questionnaire(
          questionnaire.id,
          questionnaire.form,
          questionnaire.version,
        ),
      )
    }
    this.questionnaires = questionnaireArray
  }

  public getQuestionnaires() {
    return this.questionnaires
  }

  public getExperimentInfo() {
    return { id: this.id, title: this.title, description: this.description }
  }

  public async createQuestionnaire(questionnaireData: JSON) {
    try {
      const experiment = await db.dbExperiment.findUnique({
        where: {
          id: this.id,
        },
      })

      const newId = v4()
      await db.dbQuestionnaire.create({
        data: {
          experiment: { connect: experiment },
          version: (this.questionnaires.length + 1).toString(),
          form: JSON.stringify(questionnaireData),
        },
      })
      this.questionnaires.push(
        new Questionnaire(newId, JSON.stringify(questionnaireData)),
      )
    } catch (error) {
      console.error('Failed to create questionnaire:', error)
      // Optionally, you can throw the error to be handled by the caller
      throw error
    }
  }

  public async deleteQuestionnaire(questionnaireId: string) {
    await db.dbExperiment.delete({
      where: {
        id: questionnaireId,
      },
    })
    this.questionnaires = this.questionnaires.filter(
      (questionnaire) =>
        questionnaire.getQuestionnaireInfo().id !== questionnaireId,
    )
  }

  public getQuestionnaireById(questionnaireId: string) {
    for (const questionnaire of this.questionnaires) {
      if (questionnaire.getQuestionnaireInfo().id === questionnaireId) {
        return questionnaire
      }
    }
  }

  public async getExperimentAssistants() {
    // Finds all users with rank assistant = 10, that is associated with this objects id.
    try {
      const experimentAssistants = await db.dbUser.findMany({
        where: {
          experiments: { some: { id: this.id } },
          role: 10,
        },
      })
      return experimentAssistants
    } catch (err: any) {
      console.error('Failed to fetch experiment assistants', err)
      throw err
    }
  }
}
