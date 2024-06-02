import QuestionnaireManager from '@main/models/Questionnaire/QuestionnaireManager'

describe('QuestionnaireManager', () => {
  let questionnaireManager: QuestionnaireManager

  beforeEach(async () => {
    questionnaireManager = new QuestionnaireManager('test-id')
  })

  it('should ...', async () => {
    questionnaireManager.getQuestionnaires()
  })
})
