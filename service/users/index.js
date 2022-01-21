import repositoryUsers from "../../repository/users"

class UsersService {
  async create(body) {
    const { id, name, email, avatarURL, verificationToken } =
      await repositoryUsers.createUser(body)
    return { id, name, email, avatarURL, verificationToken }
  }
}

export default new UsersService()
