import jwt from "jsonwebtoken"
import { HttpCode } from "../../lib/contacts"
import { findById } from "../../repository/auth"
// import AuthService from "../../service/auth"

const currentUser = async (req, res, _next) => {
  const token = req.get("Authorization")?.split(" ")[1]
  const payload = jwt.decode(token)
  const user = await findById(payload.id)
  console.log(user)
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not unauthorized",
    })
  }

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { email: user.email, subscription: user.subscription },
  })
}

export default currentUser
