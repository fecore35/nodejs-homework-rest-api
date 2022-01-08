import { getContactById } from '../../repository/contacts'

const getOneContact = async (req, res, _next) => {
  const { id } = req.params
  const contact = await getContactById(id)

  if (contact) {
    return res.status(200).json(contact)
  }

  res.status(404).json({ message: 'Not found' })
}

export default getOneContact
