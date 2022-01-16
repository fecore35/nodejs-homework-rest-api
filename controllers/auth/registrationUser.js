import { HttpCode } from "../../lib/contacts"
import AuthService from "../../service/auth"
import UserService from "../../service/user"

const registration = async (req, res, _next) => {
  const { email } = req.body
  const isUserExist = await AuthService.isUserExist(email)
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    })
  }

  const data = await UserService.create(req.body)

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    data,
  })
}

export default registration
