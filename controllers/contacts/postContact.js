import { addContact } from '../../repository/contacts'

const postContact = async (req, res, _next) => {
  const newContact = await addContact(req.body)
  res.status(201).json(newContact)
}

export default postContact
