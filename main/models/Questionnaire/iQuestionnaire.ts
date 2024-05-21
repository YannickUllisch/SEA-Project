export interface iQuestionnaire {
  getQuestionnaireInfo(): { id: string; form: string; version: string }
  updateQuestionnaireForm(newJSON: JSON): void
}
