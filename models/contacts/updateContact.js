import writeContacts from "./writeContacts"
import contacts from '../../db/contacts.json'

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const updateContact = { id:contactId, ...contacts[index], ...body }
  contacts[index] = updateContact
  await writeContacts(contacts)
  return updateContact
}

export default updateContact
