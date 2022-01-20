import { Router } from "express"
import guard from "../../../middlewares/guard"
import limiter from "../../../middlewares/rate-limit"
import AuthController from "../../../controllers/auth"

const router = new Router()

router.post("/registration", limiter(15 * 60 * 1000, 3), AuthController.signup)
router.post("/login", AuthController.login)
router.post("/logout", guard, AuthController.logout)
router.get("/current", guard, AuthController.current)

export default router
