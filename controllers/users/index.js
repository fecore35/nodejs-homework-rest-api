/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/contacts"
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../../service/file-storage"
import { EmailService, SenderSendGrig } from "../../service/email"
import repositoryUsers from "../../repository/users"
import { findByEmail } from "../../repository/auth"

class UserController {
  async uploadAvatar(req, res, _next) {
    const uploadService = new UploadFileService(
      LocalFileStorage,
      req.file,
      res.locals.user
    )

    const avatarUrl = await uploadService.updateAvatar()
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } })
  }

  async verify(req, res, _next) {
    const verifyToken = req.params.verificationToken
    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken)

    console.log(userFromToken)

    if (userFromToken) {
      await repositoryUsers.updateVerify(userFromToken.id, true)

      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "Verification successful",
      })
    }

    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Invalid token!",
    })
  }

  async repeatVerify(req, res, next) {
    const { email } = req.body
    const user = await findByEmail(email)

    if (user) {
      const { email, verificationToken } = user
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendGrig()
      )

      if (verificationToken) {
        const isSend = await emailService.sendVerifyEmail(
          email,
          verificationToken
        )

        if (isSend) {
          return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            message: "Verification email sent",
          })
        }
      }

      return res.status(HttpCode.UE).json({
        status: "error",
        code: HttpCode.UE,
        message: "Verification has already been passed",
      })
    }

    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "User with email not found",
    })
  }
}

export default new UserController()
