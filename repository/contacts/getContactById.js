import Contact from "../../models/contact"

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription",
  })
  return result
}

export default getContactById
