import User from "../../models/user"

export const createUser = async (body) => {
  const user = new User(body)
  return await user.save()
}

export const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL })
}
