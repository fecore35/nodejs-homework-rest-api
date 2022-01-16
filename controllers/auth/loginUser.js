import { HttpCode } from "../../lib/contacts"
import AuthService from "../../service/auth"

const loginUser = async (req, res, _next) => {
  const { email, password } = req.body
  const user = await AuthService.getUser(email, password)

  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credential",
    })
  }

  const token = AuthService.getToken(user)
  await AuthService.saveToken(user.id, token)

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { token },
  })
}

export default loginUser
