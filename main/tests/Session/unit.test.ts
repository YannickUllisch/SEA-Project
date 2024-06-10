import { db } from '@main/helpers/db'
import { Session } from '@main/models/Session'
import { User } from '@main/models/User/User'
import bcrypt from 'bcryptjs'

describe('Session', () => {
  it('should correctly initialize session if user exists', async () => {
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

    expect(Session.getSession()).toBeInstanceOf(Session)

    Session.getSession().clearSession()
  })

  it('should not initialize session if user does not exists', async () => {
    expect(await Session.authenticate('test_notExist', '123')).toBeNull()

    expect(Session.getSession()).toBeNull()
  })

  it('should correctly clear session', async () => {
    // We have to create our own user, since the database is empty initially
    await db.dbUser.create({
      data: {
        name: 'test2',
        password: await bcrypt.hash('123', 10),
        role: 1,
        id: 'test2',
      },
    })

    expect(await Session.authenticate('test2', '123')).toBeDefined()

    expect(Session.getSession()).toBeInstanceOf(Session)

    Session.getSession().clearSession()
    expect(Session.getSession()).toBeNull()
  })

  it('should correctly initialize user', async () => {
    // We have to create our own user, since the database is empty initially
    await db.dbUser.create({
      data: {
        name: 'test3',
        password: await bcrypt.hash('123', 10),
        role: 1,
        id: 'test3',
      },
    })

    expect(await Session.authenticate('test3', '123')).toBeDefined()

    expect(Session.getSession().getUser()).toBeInstanceOf(User)
    Session.getSession().clearSession()
  })
})
