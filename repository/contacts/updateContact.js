import Contact from '../../models/contact'

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId, 
    { ...body },
    { new: true },
  )
  return result
}

export default updateContact
