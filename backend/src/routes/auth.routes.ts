import User from '../models/User'
import { Router } from 'express'
import validateReq from '../middlewares/validateReq'
import { loginUser, registerUser } from '../validators/auth'
import sendResponse from '../utils/sendResponse'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const router = Router()

router.get('/me', passport.authenticate('token'), async (req, res) => {
  try {
    const user = req.user
    user.glossaries = undefined

    return sendResponse(res, 200, { user })
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.post('/sign-up', validateReq(registerUser, 'body'), async (req, res) => {
  try {
    const { email } = req.body
    const verify = await User.findOne({ email })

    if (verify) {
      return sendResponse(res, 400, 'The email exist')
    }

    const user = await User.create({ ...req.body })

    if (!user) {
      return sendResponse(res, 500, 'Error to save user')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
      expiresIn: 24 * 24 * 60
    })

    return sendResponse(res, 200, { token })
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.post('/sign-in',
  validateReq(loginUser, 'body'),
  passport.authenticate('login'),
  async (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_PASSWORD, {
        expiresIn: 24 * 24 * 60
      })

      return sendResponse(res, 200, { token })
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

export default router
