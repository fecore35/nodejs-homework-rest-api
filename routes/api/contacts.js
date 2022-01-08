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
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} from "../../midllewares/validation/contactValidation"

const router = new Router()

router.get("/", getAllContacts)

router.get("/:id", getOneContact)

router.post("/", validateCreate, postContact)

router.delete("/:id", deleteContact)

router.put("/:id", validateUpdate, putContact)

router.patch("/:id/favorite", validateUpdateFavorite, updateStatusContact)

export default router
