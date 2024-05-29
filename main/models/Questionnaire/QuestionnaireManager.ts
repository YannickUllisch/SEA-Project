import { db } from '@main/helpers/db'
import { Questionnaire } from './Questionnaire'
import { v4 } from 'uuid'

export class QuestionnaireManager {
  private experimentId: string
  private questionnaires: Questionnaire[]

  constructor(experimentId: string) {
    this.experimentId = experimentId
    this.questionnaires = []
    this.setQuestionnaires()
  }
  public async setQuestionnaires() {
    const experimentQuestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: this.experimentId,
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

  public async initRdmQuestionnaire() {
    // TODO: Refactor this to use local questionnaire objects
    const dbquestionnaires = await db.dbQuestionnaire.findMany({
      where: {
        experimentId: this.experimentId,
      },
    })

    const randomQuestionnaire =
      dbquestionnaires[Math.floor(Math.random() * dbquestionnaires.length)]

    return {
      id: randomQuestionnaire.id,
      form: randomQuestionnaire.form,
      version: randomQuestionnaire.version,
    }
  }

  public async createQuestionnaire(questionnaireData: JSON, version?: string) {
    try {
      const newId = v4()
      await db.dbQuestionnaire.create({
        data: {
          id: newId,
          experimentId: this.experimentId,
          version: version ?? '',
          form: JSON.stringify(questionnaireData),
        },
      })
      this.questionnaires.push(
        new Questionnaire(newId, JSON.stringify(questionnaireData), version),
      )
    } catch (error) {
      console.error('Failed to create questionnaire:', error)
      // Optionally, you can throw the error to be handled by the caller
      throw error
    }
  }

  public async deleteQuestionnaire(questionnaireId: string) {
    await db.dbQuestionnaire.delete({
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

  public async copyQuestionnaireById(questionnaireId: string) {
    for (const questionnaire of this.questionnaires) {
      if (questionnaire.getQuestionnaireInfo().id === questionnaireId) {
        const uid = v4()
        await db.dbQuestionnaire.create({
          data: {
            id: uid,
            form: questionnaire.getQuestionnaireInfo().form,
            version: `${questionnaire.getQuestionnaireInfo().version} copy`,
            experimentId: this.experimentId,
          },
        })

        this.questionnaires.push(
          new Questionnaire(
            uid,
            questionnaire.getQuestionnaireInfo().form,
            `${questionnaire.getQuestionnaireInfo().version} copy`,
          ),
        )
      }
    }
  }
}
