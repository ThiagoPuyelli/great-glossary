import joi from 'joi'

export const saveWord = joi.object({
  word: joi.string().required().max(30),
  definition: joi.string().required().max(400)
})
