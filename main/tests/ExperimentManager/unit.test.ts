import { db } from '@main/helpers/db'
import { ExperimentManager } from '@main/models/Experiment/ExperimentManager'
import bcrypt from 'bcryptjs'

describe('ExperimentManager', () => {
  let experimentManager: ExperimentManager

  beforeEach(async () => {
    experimentManager = new ExperimentManager('test-user')
  })

  it('should set experiments based on user', async () => {
    await db.dbExperiment.create({
      data: {
        description: 'test',
        title: 'test',
        restartCode: '123',
        id: 'test-experiment-id',
        users: {
          create: {
            name: 'test-user',
            password: '123',
            role: 1,
            id: 'test-user-id',
          },
        },
      },
    })

    const newManager = new ExperimentManager('test-user-id')
    await newManager.setExperiments('test-user-id')

    expect(await newManager.getExperiments()).toHaveLength(1)
  })

  it('should get experiments', async () => {
    expect((await experimentManager.getExperiments()).length).toBe(0)
    await experimentManager.createExperiment(
      'newTest',
      'newTest',
      '123',
      'disriptText',
      'expTestID',
    )
    expect((await experimentManager.getExperiments()).length).toBe(1)
  })

  it('should create experiment', async () => {
    await experimentManager.createExperiment('test', 'test', '123', 'yo')
    expect((await experimentManager.getExperiments()).length).toBe(1)

    // Checking if createExperiment correctly saves experiment to database.
    const experimentDb = await db.dbExperiment.findFirst({
      where: {
        id: 'yo',
      },
    })

    expect(experimentDb).toBeDefined()
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

    // Checking if createExperiment correctly saves experiment to database.
    const experimentDb = await db.dbExperiment.findFirst({
      where: {
        id: 'test-id',
      },
    })
    expect(experimentDb).toBeNull()
  })

  it('should get experiment by id', async () => {
    await experimentManager.createExperiment('', 'FoundById', '', '', 'test-id')
    const experiment = experimentManager.getExperimentById('test-id')
    expect(experiment.getExperimentInfo().title).toBe('FoundById')
  })
})
