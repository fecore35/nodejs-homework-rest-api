import User from "../../models/user"

export const createUser = async (body) => {
  const user = new User(body)
  return await user.save()
}

export const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL })
}

export const updateVerify = async (id, status) => {
  return await User.updateOne(
    { _id: id },
    { isVerify: status, verificationToken: null }
  )
}

export const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken })
}

export default { createUser, updateAvatar, findByVerifyToken, updateVerify }
