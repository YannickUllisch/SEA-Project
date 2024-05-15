import type { dbUser } from '@prisma/client'

export class UserHandler {
  id: string
  name: string
  hashedPassword: string
  role: number

  public constructor(user: dbUser) {
    this.id = user.id
    this.name = user.name
    this.hashedPassword = user.password
    this.role = user.role
  }

  public authenticateUser(_name: string, _password: string) {
    return 0
  }

  public createAssistant() {
    return 0
  }

  public createAdmin() {
    return 0
  }

  public deleteAssistant() {
    return 0
  }
}
