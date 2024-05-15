import type { dbUser } from '@prisma/client'

export class UserHandler {
  public authenticate(_name: string, _password: string) {
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
