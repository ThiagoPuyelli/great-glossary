import User from '../models/User'
import { Router } from 'express'
import validateReq from '../middlewares/validateReq'
import { loginUser, registerUser, modifyUser, changePassword } from '../validators/auth'
import sendResponse from '../utils/sendResponse'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import randomstring from 'randomstring'
import mailer from '../utils/mailer'

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

router.put('/',
  passport.authenticate('token'),
  validateReq(modifyUser, 'body'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, { ...req.body })

      if (!user) {
        return sendResponse(res, 500, 'Error to modify user')
      }

      return sendResponse(res, 200, 'User modified')
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

router.put('/recover-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email || email === '') {
      return sendResponse(res, 404, 'The email is invalid')
    }

    const user = await User.findOne({ email })

    if (!user) {
      return sendResponse(res, 404, 'The email is incorrect')
    }

    const codePassword = {
      code: randomstring.generate(7),
      date: Date.now() + 3600000
    }

    const userUpdate = await User.findOneAndUpdate({ email }, { codePassword })

    if (!userUpdate) {
      return sendResponse(res, 500, 'Error to save code')
    }

    await mailer.sendMail({
      from: '\'Cambio de contraseña\' <cloudinaryprueba@gmail.com>',
      to: user.email,
      subject: 'Code for recover password',
      html: `<b>Code: ${codePassword.code}</b>`
    })

    return sendResponse(res, 200, 'Mail sended')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.put('/change-password', validateReq(changePassword, 'body'), async (req, res) => {
  try {
    const { email, code, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return sendResponse(res, 404, 'The user doesn\'t exist')
    }

    const codePassword = user.codePassword

    if (!codePassword) {
      return sendResponse(res, 404, 'You don\'t have petition for change password')
    }

    if (codePassword.date < Date.now()) {
      return sendResponse(res, 403, 'The code expired')
    }

    if (codePassword.code !== code) {
      return sendResponse(res, 404, 'The code is incorrect')
    }

    user.password = password
    user.codePassword = undefined

    const userUpdate = await user.save()

    if (!userUpdate) {
      return sendResponse(res, 500, 'Error to update user')
    }

    return sendResponse(res, 200, 'Password changed')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.delete('/', passport.authenticate('token'), async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndRemove(req.user._id)

    if (!userDeleted) {
      return sendResponse(res, 500, 'Error to delete user')
    }

    return sendResponse(res, 200, 'User deleted')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

export default router
