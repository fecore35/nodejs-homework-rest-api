import { listContacts } from "../../repository/contacts"
import { HttpCode } from "../../lib/contacts"

const getAllContacts = async (_req, res, _next) => {
  const contacts = await listContacts()
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } })
}

export default getAllContacts
