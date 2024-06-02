import { Experiment } from '@main/models/Experiment/Experiment'

describe('Experiment', () => {
  let experiment: Experiment

  beforeEach(async () => {
    experiment = new Experiment('title', 'desc', 'test-id', 'restart')
  })

  it('should return correct information', async () => {
    expect(experiment.getExperimentInfo().title).toBe('title')
    expect(experiment.getExperimentInfo().restartCode).toBe('restart')
    expect(experiment.getExperimentInfo().description).toBe('desc')
    expect(experiment.getExperimentInfo().id).toBe('test-id')
  })
})
