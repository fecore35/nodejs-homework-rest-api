import { randomUUID } from "crypto"
import writeContacts from "./writeContacts"
import contacts from '../../db/contacts.json'

const addContact = async (body) => {
  const newContact = { id: randomUUID(), ...body}

  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}

export default addContact
