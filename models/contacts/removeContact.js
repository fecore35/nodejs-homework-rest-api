import writeContacts from "./writeContacts"
import contacts from '../../db/contacts.json'

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const [ result ] = contacts.splice(index, 1)
  await writeContacts(contacts)
  return result;
}

export default removeContact
