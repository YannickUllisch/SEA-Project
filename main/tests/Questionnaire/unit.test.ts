import { db } from '@main/helpers/db'
import { Questionnaire } from '@main/models/Questionnaire/Questionnaire'

describe('Questionnaire', () => {
  let questionnaire: Questionnaire

  beforeEach(async () => {
    questionnaire = new Questionnaire('test-id', 'form', 'versionTestName')
  })

  it('should set Answers', async () => {
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })
    await db.dbQuestionnaire.create({
      data: {
        form: 'test_form',
        id: 'new_id',
        version: 'version_2',
        experimentId: 'testExpID_2',
        questionnaireAnswersID: {
          create: {
            answers: JSON.stringify(randJSON),
            age: 20,
            country: 'Denmark',
            gender: 'Male',
          },
        },
      },
    })
    const newQuest = new Questionnaire('new_id', 'test_form', 'version_2')
    await newQuest.setAnswers()
    expect(newQuest.getAnswers()).toHaveLength(1)
  })

  it('should get Answers', async () => {
    expect(questionnaire.getAnswers()).toHaveLength(0)
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })
    await db.dbQuestionnaire.create({
      data: {
        form: 'test_form_3',
        id: 'new_id_3',
        version: 'version_3',
        experimentId: 'testExpID_3',
        questionnaireAnswersID: {
          create: {
            answers: JSON.stringify(randJSON),
            age: 20,
            country: 'Denmark',
            gender: 'Male',
          },
        },
      },
    })
    const newQuest3 = new Questionnaire('new_id_3', 'test_form_3', 'version_3')
    await newQuest3.setAnswers()
    expect(newQuest3.getAnswers()).toHaveLength(1)
  })

  it('should get QuestionnaireInfo', async () => {
    expect(questionnaire.getQuestionnaireInfo().form).toBe('form')
    expect(questionnaire.getQuestionnaireInfo().id).toBe('test-id')
    expect(questionnaire.getQuestionnaireInfo().version).toBe('versionTestName')
  })

  it('should set updated questionnaire version', async () => {
    expect(questionnaire.getQuestionnaireInfo().version).toBe('versionTestName')
    questionnaire.setVersion('updateVersionTestName')
    expect(await questionnaire.getQuestionnaireInfo().version).toBe(
      'updateVersionTestName',
    )
  })

  it('should update QuestionnaireForm', async () => {
    expect(questionnaire.getQuestionnaireInfo().form).toBe('form')
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    const randJSONString = JSON.stringify(randJSON)

    questionnaire.updateQuestionnaireForm(randJSON)
    expect(questionnaire.getQuestionnaireInfo().form).toBe(randJSONString)
  })

  it('should save QuestionnaireAnswer', async () => {
    expect(questionnaire.getAnswers()).toHaveLength(0)
    const randJSON: JSON = <JSON>(<unknown>{
      logoPosition: 'right',
      elements: [
        { type: 'text', name: 'question1' },
        { type: 'text', name: 'question2' },
      ],
    })

    const newQuest3 = new Questionnaire('new_id_3', 'test_form_3', 'version_3')
    await newQuest3.saveQuestionnaireAnswer(
      randJSON,
      20,
      'Denmark',
      'Male',
      'answer-id',
    )
    expect(newQuest3.getAnswers()).toHaveLength(1)
    // Checking if createExperiment correctly saves experiment to database.
    const questionnaireAnswerDb = await db.dbQuestionnaireAnswers.findFirst({
      where: {
        id: 'answer-id',
      },
    })

    expect(questionnaireAnswerDb).toBeDefined()
  })
})
