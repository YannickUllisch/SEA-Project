import { User } from '@main/models/User/User'

describe('AdminUser', () => {
  let user: User

  beforeEach(async () => {
    user = new User('test-id', 'name', 1)
  })

  it('should return valid experimentManager', async () => {
    user.getUserRole()
  })
})
