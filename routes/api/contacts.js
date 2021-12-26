import { Router } from 'express' 
import model from '../../model'

const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  res.status(200).json(contacts)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await model.getContactById(id)

  if (contact) {
    return res.status(200).json(contact)
  }

  res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const isName = 'name' in req.body;
  const isEmail = 'email' in req.body;
  const isPhone = 'phone' in req.body;
  
  if ( isName && isEmail && isPhone ) {
    const newContact = await model.addContact(req.body)
    return res.status(201).json(newContact)
  }
  
  res.status(400).json({"message": "missing required name field"})
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await model.removeContact(id)

  if (contact) {
    return res.status(200).json({"message": "contact deleted"})
  }

  res.status(404).json({ message: 'Not found' })
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const updateContact = await model.updateContact(id, req.body)
  res.status(200).json(updateContact)
})

export default router
