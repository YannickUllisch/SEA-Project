// Fetch by Id and Create function for Admins
import { db } from './dbClient'

/**
 *
 * @param id The user ID, that identifies a specific user
 * @returns A User object
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

/**
 *
 * @param username A username, that identifies a specific user
 * @returns A User object
 */
export const getUserByName = async (name: string) => {
  try {
    const user = await db.user.findFirst({ where: { name } })

    return user
  } catch {
    return null
  }
}

/**
 *
 * @param name The name of the new User
 * @param encryptedPassword The user password, password needs to be encrypted using bcrypt.
 * @param role INT that defines role, 0 = Admin, 1 = Assistant
 * @returns Nothing if it works and an error if it fails.
 */
export const createUser = async (
  name: string,
  encryptedPassword: string,
  role: number,
) => {
  if (role !== 1 && role !== 0) {
    return 'Role number not accepted'
  }
  try {
    await db.user.create({
      data: {
        name,
        password: encryptedPassword,
        role,
      },
    })
  } catch (error: any) {
    return error
  }
}
