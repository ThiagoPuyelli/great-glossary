import { Schema } from 'joi'
import sendResponse from '../utils/sendResponse'

export default (
  schema: Schema,
  check: 'body' | 'params'
) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[check])
      next()
    } catch (err) {
      return sendResponse(res, 500, err.details)
    }
  }
}
