import { findByEmail } from "../../repository/auth"

class AuthService {
  async isUserExist(email) {
    const user = await findByEmail(email)
    return !!user
  }
}

export default new AuthService()
