import { Router } from 'express' 
import { 
  getAllContacts, 
  getOneContact,
  postContact,
  deleteContact,
  putContact
} from '../../controllers/contacts'
import { validateCreate, validateUpdate } from '../../midllewares/validation/contactValidation'

const router = new Router()

router.get('/', getAllContacts)

router.get('/:id', getOneContact)

router.post('/', validateCreate, postContact)

router.delete('/:id', deleteContact)

router.put('/:id', validateUpdate, putContact)

export default router
