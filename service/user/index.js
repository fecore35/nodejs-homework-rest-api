import { createUser } from "../../repository/user"

class UserService {
  async create(body) {
    const { id, email, avatarURL } = await createUser(body)
    return { id, email, avatarURL }
  }
}

export default new UserService()
