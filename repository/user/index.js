import User from "../../models/user"

export const createUser = async (body) => {
  const user = new User(body)
  return await user.save()
}
