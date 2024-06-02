import { QuestionnaireAnswer } from '@main/models/Questionnaire/QuestionnaireAnswer'
import { User } from '@main/models/User/User'

test('Manager', () => {
  expect(3).toBe(3)
  const _test = new QuestionnaireAnswer(15, '', '', '')
  const _testUser = new User('test', 'test', 10)
})
