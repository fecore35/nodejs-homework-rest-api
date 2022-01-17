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
  validateQuery,
} from "../../middlewares/validation/contactValidation"
import guard from "../../middlewares/guard"

const router = new Router()

router.get("/", [guard, validateQuery], getAllContacts)

router.get("/:id", [guard, validateId], getOneContact)

router.post("/", [guard, validateCreate], postContact)

router.delete("/:id", [guard, validateId], deleteContact)

router.put("/:id", [guard, validateId, validateUpdate], putContact)

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateStatusContact
)

export default router
