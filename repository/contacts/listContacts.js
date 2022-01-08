import Contact from '../../models/contact'

const listContacts = async () => {
  const result = await Contact.find()
  return result
}

export default listContacts
