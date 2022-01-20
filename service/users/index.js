import { createUser } from "../../repository/users"

class UsersService {
  async create(body) {
    const { id, email, avatarURL } = await createUser(body)
    return { id, email, avatarURL }
  }
}

export default new UsersService()
