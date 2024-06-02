import { QuestionnaireAnswer } from '@main/models/Questionnaire/QuestionnaireAnswer'

describe('QuestionnaireAnswer', () => {
  let questionnaireAnswer: QuestionnaireAnswer

  beforeEach(async () => {
    questionnaireAnswer = new QuestionnaireAnswer(
      20,
      'gender',
      'country',
      'answer',
    )
  })

  it('should ...', async () => {
    questionnaireAnswer.getDemographicsInfo()
  })
})
