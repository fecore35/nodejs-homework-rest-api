import { Router } from "express"
import guard from "../../../middlewares/guard"
import limiter from "../../../middlewares/rate-limit"
import upload from "../../../middlewares/upload"
import UserController from "../../../controllers/users"

const router = new Router()

router.get("/verify/:verificationToken", UserController.verify)
router.post("/verify", limiter(15 * 60 * 1000, 2), UserController.repeatVerify)
router.patch(
  "/avatars",
  [guard, upload.single("avatar")],
  UserController.uploadAvatar
)

export default router
