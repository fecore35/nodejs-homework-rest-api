import { ObjectId } from 'mongodb'
import db from "../../db"
import getCollection from '../../db/getCollection'

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts")
  const id = ObjectId(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: id }, 
    { $set: body },
    { returnDocument: "after" },
  )
  return result
}

export default updateContact
