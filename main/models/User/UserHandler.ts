import { db } from '@main/helpers/db'
import bcrypt from 'bcryptjs'
import { Session } from '../Session'

export class UserHandler {
  public async authenticate(username: string, password: string) {
    const existingUser = await db.dbUser.findFirst({
      where: {
        name: username,
      },
    })

    if (!existingUser) {
      return null
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      // We authenticate the user by both initializing the backend Session (which starts all of the backend logic)
      Session.initSession(existingUser)
      // And also send authenticated status to the frontend
      return existingUser
    }
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
