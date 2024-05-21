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
