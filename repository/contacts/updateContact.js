import Contact from "../../models/contact"

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  ).populate({
    path: "owner",
    select: "email subscription",
  })
  return result
}

export default updateContact
