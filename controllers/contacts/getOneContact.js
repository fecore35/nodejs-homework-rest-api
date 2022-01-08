import { getContactById } from "../../repository/contacts"
import { HttpCode } from "../../lib/contacts"

const getOneContact = async (req, res, _next) => {
  const { id } = req.params
  const contact = await getContactById(id)

  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } })
  }

  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" })
}

export default getOneContact
