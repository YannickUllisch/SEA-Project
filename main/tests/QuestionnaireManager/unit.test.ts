import QuestionnaireManager from '@main/models/Questionnaire/QuestionnaireManager'
import { db } from '@main/helpers/db'

describe('QuestionnaireManager', () => {
  let questionnaireManager: QuestionnaireManager

  beforeEach(async () => {
    questionnaireManager = new QuestionnaireManager('test-id')
  })

  // should clears all mocks to ensure tests are independent
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })

  it('should set valid Questionnaires', async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    await db.dbExperiment.create({
      data: {
        id: 'test-experiment-id',
        restartCode: '123',
        description: '123',
        title: '123',
        questionnaireID: {
          create: {
            form: JSON.stringify(randJSON),
            version: '',
          },
        },
      },
    })

    const newManager = new QuestionnaireManager('test-experiment-id')
    await newManager.setQuestionnaires()

    expect(newManager.getQuestionnaires()).toHaveLength(1)
  })

  it('should get valid Questionnaire', async () => {
    expect(questionnaireManager.getQuestionnaires().length).toBe(0)
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    await questionnaireManager.createQuestionnaire(
      randJSON,
      'version new',
      'new_id_get',
    )
    expect(questionnaireManager.getQuestionnaires()).toHaveLength(1)
  })

  it('should delete existing questionnaire --> deleteQuestionnaire', async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    const manager = new QuestionnaireManager('test-manager-id')

    await manager.createQuestionnaire(randJSON, 'version_A', 'FoundByTestID')

    expect(manager.getQuestionnaires()).toHaveLength(1) //expect(questionnaireManager.getQuestionnaires().length).toBe(1)
    await manager.deleteQuestionnaire('FoundByTestID')
    expect(manager.getQuestionnaires()).toHaveLength(0)

    // Checking if createExperiment correctly deletes experiment in database.
    const questionnaireDb = await db.dbQuestionnaire.findFirst({
      where: {
        id: 'FoundByTestID',
      },
    })
    expect(questionnaireDb).toBeNull()
  })

  it('should create new questionnaire --> createQuestionnaire', async () => {
    const manager = new QuestionnaireManager('nothing-id')
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    expect(manager.getQuestionnaires()).toHaveLength(0)

    await manager.createQuestionnaire(randJSON, 'version new', 'new_id_test2')

    expect(manager.getQuestionnaires()).toHaveLength(1)

    // Checking if createQuestionnaire correctly saves experiment to databas
    const questionnaireDb = await db.dbQuestionnaire.findFirst({
      where: {
        id: 'new_id_test2',
      },
    })
    expect(questionnaireDb).toBeDefined()
  })

  it('should get valid quetionnaire by id --> getQuestionnaireById ', async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    await questionnaireManager.createQuestionnaire(
      randJSON,
      'version_A',
      'testID',
    )
    const questionnaire = questionnaireManager.getQuestionnaireById('testID')
    expect(questionnaire.getQuestionnaireInfo().id).toBe('testID')
  })

  it('should copy existing questionnaire by id --> copyQuestionnaireById', async () => {
    const manager = new QuestionnaireManager('new-test-id')
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    expect(manager.getQuestionnaires()).toHaveLength(0)

    await manager.createQuestionnaire(
      randJSON,
      'version first',
      'firstVersion_id',
    )
    expect(manager.getQuestionnaires()).toHaveLength(1)
    await manager.copyQuestionnaireById('firstVersion_id')

    //Checking if copyQuestionnaireById correctly copies questionnaire by its id.
    const questionnaireDb = await db.dbQuestionnaire.findFirst({
      where: {
        version: 'version first copy',
      },
    })

    expect(questionnaireDb.version).toBe('version first copy')
    expect(manager.getQuestionnaires()).toHaveLength(2)
  })

  // TODO -->
  it('should intialize random questionnaires --> initRdmQuestionnaire', async () => {})

  it('should export all answer to a CSV --> exportAllAnswers', async () => {})
})
