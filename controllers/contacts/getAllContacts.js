import { listContacts } from "../../repository/contacts"
import { HttpCode } from "../../lib/contacts"

const getAllContacts = async (req, res, _next) => {
  const { id: userId } = res.locals.user

  const contacts = await listContacts(userId, req.query)
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } })
}

export default getAllContacts
