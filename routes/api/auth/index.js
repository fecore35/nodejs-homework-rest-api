import { Router } from "express"
import guard from "../../../middlewares/guard"
import AuthController from "../../../controllers/auth"

const router = new Router()

router.post("/registration", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/logout", guard, AuthController.logout)
router.get("/current", guard, AuthController.current)

export default router
