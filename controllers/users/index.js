/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/contacts"
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../../service/file-storage"

class UserController {
  async uploadAvatar(req, res, next) {
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
}

export default new UserController()
