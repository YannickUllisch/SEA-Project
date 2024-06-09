import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { User } from '@main/models/User/User'
import bcrypt from 'bcryptjs'
import { ExperimentManager } from '@main/models/Experiment/ExperimentManager'
import QuestionnaireManager from '@main/models/Questionnaire/QuestionnaireManager'
import { version } from 'node:os'

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

describe('Session, User, and Security Integration Tests', () => {
  beforeEach(async () => {
    await db.dbUser.create({
      data: {
        name: 'integrationUser',
        password: await bcrypt.hash('securePass123', 10),
        role: 1,
        id: 'integration-user-id',
      },
    })
  })

  it('should not authenticate a user with incorrect password', async () => {
    // Expect the authenticate function to throw due to invalid credentials
    await expect(
      Session.authenticate('integrationUser', 'securePass12'),
    ).rejects.toThrow('Invalid credentials')
  })

  afterEach(async () => {
    await db.dbUser.delete({
      where: { id: 'integration-user-id' },
    })
  })
})

describe('Session and User Integration Tests', () => {
  beforeEach(async () => {
    await db.dbUser.create({
      data: {
        name: 'integrationUser',
        password: await bcrypt.hash('securePass123', 10),
        role: 1,
        id: 'integration-user-id',
      },
    })
  })

  it('User should not be able to delete', async () => {
    const session = await Session.authenticate(
      'integrationUser',
      'securePass123',
    )
    const user = Session.getSession().getUser()
    user.handleDeleteUser('integration-user-id')
    expect(user).toBeDefined()
  })

  afterEach(async () => {
    await db.dbUser.delete({
      where: { id: 'integration-user-id' },
    })
  })
})

describe('User Authentication and Session Management integration test', () => {
  it('should authenticate a user and create a session', async () => {
    const username = 'testuser'
    const password = 'testpass'
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.dbUser.create({
      data: {
        name: username,
        password: hashedPassword,
        role: 1,
        id: 'test-user-id',
      },
    })

    const authenticatedUser = await Session.authenticate(username, password)
    expect(authenticatedUser).not.toBeNull()
    const session = Session.getSession()
    expect(session.getUser().getUserID()).toBe('test-user-id')
  })

  afterEach(async () => {
    await db.dbUser.deleteMany() // Cleans up the test user
  })
})

describe('ExperimentManager and Experiment integration test', () => {
  let manager: ExperimentManager
  const userId = 'test-user-id'

  beforeEach(async () => {
    manager = new ExperimentManager(userId)
  })

  it('should create experiment and then delete an experiment', async () => {
    const title = 'Test Experiment'
    const description = 'This is a test experiment.'
    const restartCode = 'test123'
    await manager.createExperiment(userId, title, restartCode, description)
    const experiments = await manager.getExperiments()
    expect(experiments.length).toBeGreaterThan(0)

    const experimentId = experiments[0].getExperimentInfo().id
    await manager.deleteExperiment(experimentId)
    const updatedExperiments = await manager.getExperiments()
    expect(updatedExperiments.length).toBe(0)
  })
})

describe('Questionnaire and questionnaire integration test', () => {
  let qManager: QuestionnaireManager
  const experimentId = 'test-experiment-id'

  beforeEach(async () => {
    qManager = new QuestionnaireManager(experimentId)
  })

  it('should create, update, copy and delete a questionnaire', async () => {
    // Create a questionnaire
    const questionnaireData = JSON.stringify({
      question1: 'What is your favorite color?',
      question2: 'Is that color nice to you?',
    })
    await qManager.createQuestionnaire(JSON.parse(questionnaireData), 'v1')
    let questionnaires = qManager.getQuestionnaires()
    expect(questionnaires.length).toBeGreaterThan(0)
    const createdQuestionnaireId = questionnaires[0].getQuestionnaireInfo().id

    // Update the questionnaire
    const newForm = JSON.stringify({ question1: 'What is your favorite food?' })
    await questionnaires[0].updateQuestionnaireForm(JSON.parse(newForm))
    expect(questionnaires[0].getQuestionnaireInfo().form).toEqual(newForm)
    // Copy a questionnaire
    await qManager.copyQuestionnaireById(createdQuestionnaireId)
    questionnaires = qManager.getQuestionnaires()
    expect(questionnaires.length).toBeGreaterThan(1)
    // Delete the questionnaire
    await qManager.deleteQuestionnaire(createdQuestionnaireId)
    questionnaires = qManager.getQuestionnaires()
    expect(questionnaires.length).toBe(1)
  })
})
