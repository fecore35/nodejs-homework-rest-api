import Joi from "joi"
import pkg from "mongoose"

const { Types } = pkg

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
})

const regLimit = /\d+/

const querySchema = Joi.object({
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("name", "age", "email").optional(),
  sortByDesc: Joi.string().valid("name", "age", "email").optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp("(name|email|age)\\|?(name|email|age)+"))
    .optional(),
})

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone")

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body)
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, "")}` })
  }
  next()
}

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body)
  } catch (error) {
    const [{ type }] = error.details
    if (type === "object.missing") {
      return res.status(400).json({ message: `missing fields` })
    }
    return res.status(400).json({ message: error.message })
  }
  next()
}

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body)
  } catch (error) {
    const [{ type }] = error.details
    if (type === "object.missing") {
      return res.status(400).json({ message: `missing field favorite` })
    }
    return res.status(400).json({ message: error.message })
  }
  next()
}

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" })
  }
  next()
}

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, "")}` })
  }
  next()
}
