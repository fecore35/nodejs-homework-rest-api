import { Router } from "express"
import {
  registrationUser,
  loginUser,
  logoutUser,
} from "../../../controllers/auth"
import guard from "../../../middlewares/guard"

const router = new Router()

router.post("/registration", registrationUser)
router.post("/login", loginUser)
router.post("/logout", guard, logoutUser)

export default router
