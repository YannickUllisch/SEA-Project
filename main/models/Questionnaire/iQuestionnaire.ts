import type { QuestionnaireAnswer } from './QuestionnaireAnswer'

export interface iQuestionnaire {
  setAnswers(): void
  getAnswers(): QuestionnaireAnswer[]
  getQuestionnaireInfo(): { id: string; form: string; version: string }
  updateQuestionnaireForm(form: JSON): void
  saveQuestionnaireAnswer(
    form: JSON,
    age: number,
    gender: string,
    country: string,
  ): void
}
