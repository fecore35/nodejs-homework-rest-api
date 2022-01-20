import User from "../../models/user"

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

export default findByEmail
