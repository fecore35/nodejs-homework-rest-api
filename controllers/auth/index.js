import { HttpCode } from "../../lib/contacts"
import AuthService from "../../service/auth"
import UsersService from "../../service/users"
import { EmailService, SenderSendGrig } from "../../service/email"

class AuthController {
  async signup(req, res, _next) {
    const { email } = req.body
    const isUserExist = await AuthService.isUserExist(email)
    if (isUserExist) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is already exist",
      })
    }

    const { id, name, avatarURL, verificationToken } =
      await UsersService.create(req.body)
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrig()
    )
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken
    )

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: id,
        email: email,
        avatarURL: avatarURL,
        isSendEmailVerify: isSend,
      },
    })
  }

  async login(req, res, _next) {
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

  async logout(_req, res, _next) {
    await AuthService.saveToken(res.locals.user.id, null)

    res
      .status(HttpCode.NO_CONTENT)
      .json({ status: "success", code: HttpCode.NO_CONTENT, data: {} })
  }

  async current(_req, res, _next) {
    const user = await AuthService.getCurrentUser(res.locals.user.id)

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    })
  }
}

export default new AuthController()
