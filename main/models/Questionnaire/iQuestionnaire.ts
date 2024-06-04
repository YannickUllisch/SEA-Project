import type { QuestionnaireAnswer } from './QuestionnaireAnswer'

export interface iQuestionnaire {
  setAnswers(): Promise<void>
  getAnswers(): QuestionnaireAnswer[]
  setVersion(version: string): Promise<void>
  getQuestionnaireInfo(): { id: string; form: string; version: string }
  updateQuestionnaireForm(form: JSON): Promise<void>
  saveQuestionnaireAnswer(
    form: JSON,
    age: number,
    gender: string,
    country: string,
  ): Promise<void>
}
