import { HttpCode } from "../../lib/contacts"
import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
} from "../../repository/contacts"

class ContactsController {
  async getAllContacts(req, res, _next) {
    const { id: userId } = res.locals.user

    const contacts = await listContacts(userId, req.query)
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } })
  }

  async getOneContact(req, res, _next) {
    const { id } = req.params
    const { id: userId } = res.locals.user
    const contact = await getContactById(userId, id)

    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } })
    }

    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" })
  }

  async postContact(req, res, _next) {
    const { id: userId } = res.locals.user
    const newContact = await addContact(userId, req.body)
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact: newContact },
    })
  }

  async deleteContact(req, res, _next) {
    const { id } = req.params
    const { id: userId } = res.locals.user
    const contact = await removeContact(userId, id)

    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } })
    }

    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" })
  }

  async putContact(req, res, _next) {
    const { id } = req.params
    const { id: userId } = res.locals.user
    const contact = await updateContact(userId, id, req.body)
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } })
    }
    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" })
  }
}

export default new ContactsController()
