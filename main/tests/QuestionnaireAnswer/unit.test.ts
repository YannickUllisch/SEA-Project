import { QuestionnaireAnswer } from '@main/models/Questionnaire/QuestionnaireAnswer'

describe('QuestionnaireAnswer', () => {
  let questionnaireAnswer: QuestionnaireAnswer

  beforeEach(async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    questionnaireAnswer = new QuestionnaireAnswer(
      20,
      'gender',
      'country',
      JSON.stringify(randJSON),
    )
  })

  it('should get DemographicsInfo', async () => {
    expect(questionnaireAnswer.getDemographicsInfo().age).toBe(20)
    expect(questionnaireAnswer.getDemographicsInfo().country).toBe('country')
    expect(questionnaireAnswer.getDemographicsInfo().gender).toBe('gender')
  })

  it('should get AnswerJSON', async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })
    expect(questionnaireAnswer.getAnswerJSON()).toEqual(randJSON)
  })
})
