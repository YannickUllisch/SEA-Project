export interface FrontendQuestionnaire {
  id: string
  form: string
  version: string
}

export interface FrontendExperiment {
  id: string
  title: string
  description: string
}

export interface FrontendUser {
  id: string
  username: string
  role: number
}

export interface QuestionnaireAnswer {
  age: number
  gender: string
  country: string
  answerJSON: JSON
}

export interface ExperimentAnswers {
  answers: QuestionnaireAnswer[]
  version: string
  form: string
}
