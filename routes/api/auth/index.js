import { Router } from "express"
import {
  registrationUser,
  loginUser,
  logoutUser,
} from "../../../controllers/auth"

const router = new Router()

router.post("/registration", registrationUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router
