export class QuestionnaireAnswer {
  private age: number
  private gender: string
  private country: string
  private answerJSON: string

  constructor(
    age: number,
    gender: string,
    country: string,
    answerJSON: string,
  ) {
    this.age = age
    this.gender = gender
    this.country = country
    this.answerJSON = answerJSON
  }

  public getDemographicsInfo() {
    return { age: this.age, gender: this.gender, country: this.country }
  }

  public getAnswerJSON(): JSON {
    return JSON.parse(this.answerJSON)
  }
}
