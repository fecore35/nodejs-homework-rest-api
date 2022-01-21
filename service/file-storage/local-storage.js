import path from "path"
import fs from "fs/promises"
import repositoryUsers from "../../repository/users"

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id
    this.filename = file.filename
    this.filePath = file.path
    this.folderAvatars = process.env.FOLDER_FOR_AVATARS
  }

  async save() {
    const destination = path.join("public", this.folderAvatars, this.userId)
    await fs.mkdir(destination, { recursive: true })
    await fs.rename(this.filePath, path.join(destination, this.filename))
    const avatarUrl = path.normalize(
      path.join(this.folderAvatars, this.userId, this.filename)
    )
    await repositoryUsers.updateAvatar(this.userId, avatarUrl)
    return avatarUrl
  }
}

export default LocalStorage
