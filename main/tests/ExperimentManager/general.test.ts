import { ExperimentManager } from '@main/models/Experiment/ExperimentManager'

describe('ExperimentManager', () => {
  let experimentManager: ExperimentManager

  beforeEach(async () => {
    experimentManager = new ExperimentManager('test-user')
  })

  it('should create experiment', async () => {
    await experimentManager.createExperiment('test', 'test', '123', 'yo')
    expect((await experimentManager.getExperiments()).length).toBe(1)
  })

  it('should delete experiment', async () => {
    await experimentManager.createExperiment(
      'test',
      'test',
      '123',
      'yo',
      'test-id',
    )
    expect((await experimentManager.getExperiments()).length).toBe(1)
    await experimentManager.deleteExperiment('test-id')
    expect((await experimentManager.getExperiments()).length).toBe(0)
  })

  it('should get experiment by id', async () => {
    await experimentManager.createExperiment('', 'FoundById', '', '', 'test-id')
    const experiment = experimentManager.getExperimentById('test-id')
    expect(experiment.getExperimentInfo().title).toBe('FoundById')
  })
})
