import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { User } from '@main/models/User/User'
import bcrypt from 'bcryptjs'

describe('System', () => {
  beforeAll(async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })
    await db.dbUser.create({
      data: {
        id: 'user-id-system',
        name: 'system-user',
        password: await bcrypt.hash('123', 10),
        role: 1,
      },
    })

    await db.dbExperiment.create({
      data: {
        description: 'test',
        title: 'test',
        id: 'system-test-experiment',
        restartCode: '123',
        users: { connect: { id: 'user-id-system' } },
        questionnaireID: {
          create: {
            form: JSON.stringify(randJSON),
            version: 'system-version',
            id: 'system-questionnaire-id',
            questionnaireAnswersID: {
              create: {
                answers: JSON.stringify(randJSON),
                age: 15,
                country: 'Denmark',
                gender: 'Male',
                id: 'system-question-answer-id',
              },
            },
          },
        },
      },
    })

    // For the system testing we just authenticate the user beforehand, to not have to deal with individual session checks in
    // each test
    await Session.authenticate('system-user', '123')
  })

  it('should be able to authenticate existing user and initialize backend', async () => {
    expect(Session.getSession()).toBeInstanceOf(Session)
  })

  it('should should be able to create an experiment', async () => {
    // We need to make sure the experiments have set.
    await Session.getSession()
      .getUser()
      .getExperimentManager()
      .setExperiments('user-id-system')

    await Session.getSession()
      .getUser()
      .getExperimentManager()
      .createExperiment(
        'user-id-system',
        'title',
        'restart',
        'desc',
        'new_experiment_added_id',
      )

    // We expect length two since we already on test init add one experiment to the user.
    expect(
      await Session.getSession()
        .getUser()
        .getExperimentManager()
        .getExperiments(),
    ).toHaveLength(2)
  })

  it('should should be able to create an experiment', async () => {})
})
