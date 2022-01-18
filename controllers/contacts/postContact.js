import { addContact } from "../../repository/contacts"
import { HttpCode } from "../../lib/contacts"

const postContact = async (req, res, _next) => {
  const { id: userId } = res.locals.user
  const newContact = await addContact(userId, req.body)
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  })
}

export default postContact
