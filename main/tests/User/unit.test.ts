import { db } from '@main/helpers/db'
import { User } from '@main/models/User/User'
import bcrypt from 'bcryptjs'

describe('AdminUser', () => {
  let userAdmin: User
  let userOwner: User
  let userAssistant: User

  beforeEach(async () => {
    userAdmin = new User('test-id', 'admin_name', 1)
    userOwner = new User('test-id_owner', 'owner_name', 0)
    userAssistant = new User('test-id_assistant', 'assistant_name', 10)
  })

  it('should return valid experimentManager', async () => {})

  it('should return valid UserID', async () => {
    expect(userAdmin.getUserID()).toBe('test-id')
  })

  it('should return valid UserRole', async () => {
    expect(userAdmin.getUserRole()).toBe(1)
  })

  it('should handle Add assistant', async () => {
    userAdmin.handleAddUser('testName', '123', 10, 'test-assistant-id')

    const addedAssistant = await db.dbUser.findFirst({
      where: { id: 'test-assistant-id' },
    })
    expect(addedAssistant).toBeDefined()
  })

  it('should not be able to Add assistant', async () => {
    //assistant do not have access to add other assistants
    userAssistant.handleAddUser('testAdminName', '123', 10, 'test-assistant-id')

    const addedAssistant = await db.dbUser.findFirst({
      where: { id: 'test-assistant-id' },
    })
    expect(addedAssistant).toBeNull()
  })

  it('should handle Add admin', async () => {
    userOwner.handleAddUser('testAdminName', '123', 1, 'test-admin-id')

    const addedAdmin = await db.dbUser.findFirst({
      where: { id: 'test-admin-id' },
    })
    expect(addedAdmin).toBeDefined()
  })

  it('should not be able to Add admin', async () => {
    //assistant do not have access to add admins
    userAssistant.handleAddUser('testAdminName', '123', 1, 'test-admin-id')

    const addedAdmin = await db.dbUser.findFirst({
      where: { id: 'test-admin-id' },
    })
    expect(addedAdmin).toBeNull()
  })

  it('should DeleteAssistant', async () => {
    // admin delete asisstant
    await db.dbUser.create({
      data: {
        name: 'testName_delete',
        password: '123',
        role: 10,
        id: 'AssistTestID_delete',
      },
    })

    await userAdmin.handleDeleteUser('AssistTestID_delete')

    const tmp_assistant = await db.dbUser.findFirst({
      where: {
        id: 'AssistTestID_delete',
      },
    })

    expect(tmp_assistant).toBeNull()
  })

  it('should not delete assistant', async () => {
    // assistant can't delete other assistants
    await db.dbUser.create({
      data: {
        name: 'testAssist_delete',
        password: '123',
        role: 1,
        id: 'AssistTestID_delete',
      },
    })

    await userAssistant.handleDeleteUser('AssistTestID_delete')

    const tmp = await db.dbUser.findFirst({
      where: {
        id: 'AssistTestID_deletee',
      },
    })

    expect(tmp).toBeDefined()
  })

  it('should not delete admin', async () => {
    // admin can't delete admin
    await db.dbUser.create({
      data: {
        name: 'testName_delete',
        password: '123',
        role: 1,
        id: 'AdminTestID_delete',
      },
    })

    await userAdmin.handleDeleteUser('AdminTestID_delete')

    const tmp_assistant = await db.dbUser.findFirst({
      where: {
        id: 'AdminTestID_delete',
      },
    })

    expect(tmp_assistant).toBeDefined()
  })

  it('assitants should not be able to delete admin', async () => {
    // assistant can't delete admin
    await db.dbUser.create({
      data: {
        name: 'testName_delete',
        password: '123',
        role: 1,
        id: 'AdminTestID_delete',
      },
    })

    await userAssistant.handleDeleteUser('AdminTestID_delete')

    const tmp_assistant = await db.dbUser.findFirst({
      where: {
        id: 'AdminTestID_delete',
      },
    })

    expect(tmp_assistant).toBeDefined()
  })

  it('should DeleteAdmin', async () => {
    // owner check --> should be able to delete admin
    await db.dbUser.create({
      data: {
        name: 'testadmin_delete',
        password: '123',
        role: 1,
        id: 'adminID_delete',
      },
    })

    await userOwner.handleDeleteUser('adminID_delete')

    const tmp_admin = await db.dbUser.findFirst({
      where: {
        id: 'adminID_delete',
      },
    })

    expect(tmp_admin).toBeNull()
  })
})
