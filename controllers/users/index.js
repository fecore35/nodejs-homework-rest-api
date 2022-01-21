/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/contacts"
import repositoryUsers from "../../repository/users"
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../../service/file-storage"

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

  async repeatVerify(req, res, next) {}
}

export default new UserController()
