import { removeContact } from "../../repository/contacts"
import { HttpCode } from "../../lib/contacts"

const deleteContact = async (req, res, _next) => {
  const { id } = req.params
  const contact = await removeContact(id)

  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } })
  }

  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" })
}

export default deleteContact
