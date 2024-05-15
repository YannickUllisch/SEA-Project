export class User {
  id: string
  name: string
  hashedPassword: string

  constructor(id: string, name: string, hashedPassword: string) {
    this.id = id
    this.name = name
    this.hashedPassword = hashedPassword
  }
}
