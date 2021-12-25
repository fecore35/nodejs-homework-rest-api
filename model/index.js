import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'
import { randomUUID } from "crypto"

import contacts from './contacts.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const [ contact ] = contacts.find((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const [ result ] = contacts.slice(index, 1)

  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  )
  return result;
}

const addContact = async (name, email, phone) => {
  const isName = contacts.find((contact) => contact.name === name)
  const isEmail = contacts.find((contact) => contact.email === email)
  const isPhone = contacts.find((contact) => contact.phone === phone)

  if (isName) {
    return "This name is in the list"
  }

  if (isEmail) {
    return "This email is in the list"
  }

  if (isPhone) {
    return "This phone is in the list"
  }

  const newContact = { id: randomUUID(), name, email, phone }

  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  )

  return contacts
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const updateContact = { id:contactId, ...body }
  contacts[index] = updateContact
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  )
  return updateContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
