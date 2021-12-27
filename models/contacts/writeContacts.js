import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const  writeContacts = async (contacts) => {
  try {
    await fs.writeFile(
      path.join(__dirname, "../../db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    )
  } catch (error) {
    console.log(error)
  }
}

export default writeContacts
