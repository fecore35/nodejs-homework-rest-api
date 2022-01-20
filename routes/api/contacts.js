import { Router } from "express"
import ContactsController from "../../controllers/contacts"
import {
  validateId,
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
  validateQuery,
} from "../../middlewares/validation/contactValidation"
import guard from "../../middlewares/guard"

const router = new Router()

router.get("/", [guard, validateQuery], ContactsController.getAllContacts)

router.get("/:id", [guard, validateId], ContactsController.getOneContact)

router.post("/", [guard, validateCreate], ContactsController.postContact)

router.delete("/:id", [guard, validateId], ContactsController.deleteContact)

router.put(
  "/:id",
  [guard, validateId, validateUpdate],
  ContactsController.putContact
)

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  ContactsController.putContact
)

export default router
