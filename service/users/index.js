import { createUser } from "../../repository/users"

class UsersService {
  async create(body) {
    const { id, name, email, avatarURL, verificationToken } = await createUser(
      body
    )
    return { id, name, email, avatarURL, verificationToken }
  }
}

export default new UsersService()
