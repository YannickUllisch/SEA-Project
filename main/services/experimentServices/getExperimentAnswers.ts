import { ipcMain } from 'electron'
import { Session } from '@main/models/Session'

interface QuestionnaireAnswer {
  age: number
  gender: string
  country: string
  answerJSON: JSON
}

interface ExperimentAnswers {
  answers: QuestionnaireAnswer[]
  version: string
  form: string
}

ipcMain.on(
  'getExperimentAnswers',
  async (event, arg: { experimentID: string }) => {
    const questionnaires = Session.getSession()
      .getUser()
      .getExperimentManager()
      .getExperimentById(arg.experimentID)
      .getQuestionnaireManager()
      .getQuestionnaires()

    const returnAnswers: ExperimentAnswers[] = []

    for (const questionnaire of questionnaires) {
      const questionnaireAnswers = questionnaire.getAnswers()

      const answerArray: QuestionnaireAnswer[] = []

      for (const answer of questionnaireAnswers) {
        answerArray.push({
          age: answer.getDemographicsInfo().age,
          gender: answer.getDemographicsInfo().gender,
          country: answer.getDemographicsInfo().country,
          answerJSON: answer.getAnswerJSON(),
        })
      }

      returnAnswers.push({
        answers: answerArray,
        version: questionnaire.getQuestionnaireInfo().version,
        form: questionnaire.getQuestionnaireInfo().form,
      })
    }

    event.reply('getExperimentAnswers', returnAnswers)
    return
  },
)
