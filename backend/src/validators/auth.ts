import joi from 'joi'

export const registerUser = joi.object({
  name: joi.string().required().max(30),
  lastname: joi.string().required().max(30),
  email: joi.string().email().required(),
  password: joi.string().required().min(4)
})

export const loginUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(4)
})
