import { User } from './User/User'
import { db } from '@main/helpers/db'
import bcrypt from 'bcryptjs'

// We make Session a singleton

export class Session {
  private static instance: Session | undefined
  private user: User | undefined

  private constructor() {}

  public static getSession(): Session {
    if (!Session.instance) {
      return null
    }
    return Session.instance
  }

  public static async authenticate(username: string, password: string) {
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
      if (!Session.instance) {
        Session.instance = new Session()
        Session.instance.user = new User(
          existingUser.id,
          existingUser.name,
          existingUser.role,
        )
        // And also send authenticated status to the frontend
        return existingUser
      }

      // If a session is active, we overwride it with the new valid logon
      if (Session.instance) {
        Session.instance = new Session()
        Session.instance.user = new User(
          existingUser.id,
          existingUser.name,
          existingUser.role,
        )
        return existingUser
      }
    } else {
      throw new Error('Invalid credentials')
    }
  }

  public clearSession(): void {
    if (Session.instance) {
      Session.instance = undefined
      this.user = undefined
    } else {
      throw new Error('Session has not been initialized.')
    }
  }

  public getUser(): User {
    if (!this.user) {
      throw new Error('Session has not been initialized with a user.')
    }
    return this.user
  }
}
