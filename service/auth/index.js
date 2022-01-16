import jwt from "jsonwebtoken"
import { findByEmail, updateToken } from "../../repository/auth"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
class AuthService {
  async isUserExist(email) {
    const user = await findByEmail(email)
    return !!user
  }

  async getUser(email, password) {
    const user = await findByEmail(email)
    const isValidPassword = await user?.isValidPassword(password)

    if (!isValidPassword) {
      return null
    }

    return user
  }

  getToken(user) {
    const { id, email } = user
    const payload = { id, email }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "8h" })
    return token
  }

  async saveToken(id, token) {
    await updateToken(id, token)
  }
}

export default new AuthService()
