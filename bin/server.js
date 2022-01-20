import { mkdir } from "fs/promises"
import app from "../app"
import db from "../db"

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_DIR, { recursive: true })
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not runnig. Error: ${error.message}`)
})
