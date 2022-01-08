import { listContacts } from "../../repository/contacts"

const getAllContacts = async (_req, res, _next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
}

export default getAllContacts
