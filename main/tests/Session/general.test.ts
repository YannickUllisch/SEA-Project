import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import bcrypt from 'bcryptjs'

describe('Session', () => {
  beforeEach(async () => {})

  it('should...', async () => {
    // We have to create our own user, since the database is empty initially
    await db.dbUser.create({
      data: {
        name: 'test',
        password: await bcrypt.hash('123', 10),
        role: 1,
        id: 'test',
      },
    })

    expect(await Session.authenticate('test', '123')).toBeDefined()
  })
})
