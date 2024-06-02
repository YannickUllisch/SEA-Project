import { ExperimentManager } from '@main/models/Experiment/ExperimentManager'

test('createExperiment', async () => {
  const experimentManager = new ExperimentManager('test')
  await experimentManager.createExperiment('test', 'test', '123', 'yo')
  const experiments = await experimentManager.getExperiments()

  expect(experiments.length).toBe(1)
})
