import User from "../../models/user"

const findById = async (id) => {
  return await User.findById(id)
}

export default findById
