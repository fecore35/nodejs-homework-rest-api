import { updateContact } from '../../repository/contacts'

const putContact = async (req, res, _next) => {
  const { id } = req.params
  const contact = await updateContact(id, req.body)
  res.status(200).json(contact)
}

export default putContact
