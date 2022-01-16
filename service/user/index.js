import { createUser } from "../../repository/user"

class UserService {
  async create(body) {
    const { id, email } = await createUser(body)
    return { id, email }
  }
}

export default new UserService()
