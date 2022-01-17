import { HttpCode } from "../../lib/contacts"
import AuthService from "../../service/auth"

const logoutUser = async (_req, res, _next) => {
  await AuthService.saveToken(res.locals.user.id, null)

  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT, data: {} })
}

export default logoutUser
