import db from "../../db"
import getCollection from '../../db/getCollection'

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts")
  const newContact = { 
    ...body, 
    favorite: false 
  }
  const result = await collection.insertOne(newContact)
  
  return result
}

export default addContact
