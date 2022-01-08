import { removeContact } from '../../repository/contacts'

const deleteContact = async (req, res, _next) => {
  const { id } = req.params
  const contact = await removeContact(id)

  if (contact) {
    return res.status(200).json({ contact })
  }

  res.status(404).json({ message: 'Not found' })
}

export default deleteContact
