import { Router } from "express"
import guard from "../../../middlewares/guard"
import upload from "../../../middlewares/upload"
import UserController from "../../../controllers/users"

const router = new Router()

router.patch(
  "/avatars",
  [guard, upload.single("avatar")],
  UserController.uploadAvatar
)

export default router
