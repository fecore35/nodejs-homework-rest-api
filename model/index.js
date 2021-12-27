import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'
import { randomUUID } from "crypto"

import contacts from '../db/contacts.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const contact = contacts.find((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const [ result ] = contacts.splice(index, 1)
  await fs.writeFile(
    path.join(__dirname, "../db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  )
  return result;
}

const addContact = async (body) => {
  const newContact = { id: randomUUID(), ...body}

  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, "../db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  )
  return newContact
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index === -1 ) {
    return null
  }

  const updateContact = { id:contactId, ...contacts[index], ...body }
  contacts[index] = updateContact
  await fs.writeFile(
    path.join(__dirname, "../db", "contacts.json"),
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
