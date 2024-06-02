import { Questionnaire } from '@main/models/Questionnaire/Questionnaire'

describe('Questionnaire', () => {
  let questionnaire: Questionnaire

  beforeEach(async () => {
    questionnaire = new Questionnaire('test-id', 'form', 'versionTestName')
  })

  it('should ...', async () => {
    questionnaire.setVersion('')
  })
})
