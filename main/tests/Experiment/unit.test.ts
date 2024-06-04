import { db } from '@main/helpers/db'
import { Experiment } from '@main/models/Experiment/Experiment'
import QuestionnaireManager from '@main/models/Questionnaire/QuestionnaireManager'

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

  it('should get QuestionnaireManager', async () => {
    expect(await experiment.getQuestionnaireManager()).toBeInstanceOf(
      QuestionnaireManager,
    )
  })

  it('should get ExperimentAssistants', async () => {
    expect(await experiment.getExperimentAssistants()).toHaveLength(0)
    await db.dbExperiment.create({
      data: {
        description: 'test',
        title: 'test',
        restartCode: '123',
        id: 'test-experiment-id',
        users: {
          create: {
            name: 'test-assistant',
            password: '123',
            role: 10,
            id: 'test-assistant-id',
          },
        },
      },
    })
    const newExperiment = new Experiment(
      'test',
      'test',
      'test-experiment-id',
      '123',
    )
    expect(await newExperiment.getExperimentAssistants()).toHaveLength(1)
  })

  it('should get RestartCode', async () => {
    expect(experiment.getRestartCode()).toBe('restart')
  })
})
