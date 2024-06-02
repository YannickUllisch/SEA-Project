import { ExperimentManager } from '@main/models/Experiment/ExperimentManager'
import { QuestionnaireAnswer } from '@main/models/Questionnaire/QuestionnaireAnswer'
import { User } from '@main/models/User/User'

test('createExperiment', async () => {
  const experimentManager = new ExperimentManager('test')
  experimentManager.createExperiment('test', 'test', '123', 'yo')
  const experiments = await experimentManager.getExperiments()

  // doesnt work
  expect(experiments.length).toBe(0)
})
