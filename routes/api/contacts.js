import { Router } from 'express' 
import {
  addContact,
  listContacts,
  getContactById,
  updateContact,
  removeContact
} from '../../models/contacts'
import { validateCreate, validateUpdate } from './validation'

const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)

  if (contact) {
    return res.status(200).json(contact)
  }

  res.status(404).json({ message: 'Not found' })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)

  if (contact) {
    return res.status(200).json({"message": "contact deleted"})
  }

  res.status(404).json({ message: 'Not found' })
})

router.put('/:id', validateUpdate, async (req, res, next) => {
  const { id } = req.params
  const contact = await updateContact(id, req.body)
  res.status(200).json(contact)
})

export default router
