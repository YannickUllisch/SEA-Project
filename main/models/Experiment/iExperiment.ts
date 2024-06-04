import type QuestionnaireManager from '../Questionnaire/QuestionnaireManager'
import type { User } from '../User/User'

export interface iExperiment {
  getQuestionnaireManager(): QuestionnaireManager
  getExperimentInfo(): {
    id: string
    title: string
    description: string
    restartCode: string
  }
  getExperimentAssistants(): Promise<
    { id: string; username: string; role: number }[]
  >
  getRestartCode(): string
}
