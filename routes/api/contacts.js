import { Router } from "express"
import {
  getAllContacts,
  getOneContact,
  postContact,
  deleteContact,
  putContact,
  updateStatusContact,
} from "../../controllers/contacts"
import {
  validateId,
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} from "../../midllewares/validation/contactValidation"

const router = new Router()

router.get("/", getAllContacts)

router.get("/:id", validateId, getOneContact)

router.post("/", validateCreate, postContact)

router.delete("/:id", validateId, deleteContact)

router.put("/:id", [validateId, validateUpdate], putContact)

router.patch(
  "/:id/favorite",
  [validateId, validateUpdateFavorite],
  updateStatusContact
)

export default router
