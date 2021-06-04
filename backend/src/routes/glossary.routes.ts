import User from '../models/User'
import { Router } from 'express'
import passport from 'passport'
import sendResponse from '../utils/sendResponse'

const router = Router()

router.get('/', passport.authenticate('token'), async (req, res) => {
  try {
    const glossaries = req.user.glossaries

    if (!glossaries || glossaries.length === 0) {
      return sendResponse(res, 404, 'You don\'t have glossaries')
    }

    return sendResponse(res, 200, { glossaries })
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.get('/:id', passport.authenticate('token'), async (req, res) => {
  try {
    const glossary = req.user.glossaries.find(glossary => glossary._id + '' === req.params.id)

    if (!glossary) {
      return sendResponse(res, 404, 'The glossary doesn\'t exist')
    }

    return sendResponse(res, 200, { glossary })
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.post('/', passport.authenticate('token'), async (req, res) => {
  try {
    const { title } = req.body

    if (!title || title === '' || title.length > 50) {
      return sendResponse(res, 402, 'The title is invalid')
    }

    const glossary = { title, words: [] }

    const glossaries = req.user.glossaries
    glossaries.push(glossary)

    const saveGlossary = await User.findByIdAndUpdate(req.user._id, { glossaries })

    if (!saveGlossary) {
      return sendResponse(res, 500, 'Error to save glossary')
    }

    return sendResponse(res, 200, 'Glossary saved')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.put('/:id', passport.authenticate('token'), async (req, res) => {
  try {
    const { title } = req.body

    if (!title || title === '' || title.length > 50) {
      return sendResponse(res, 402, 'The title is invalid')
    }

    const glossaries = req.user.glossaries.map(glossary => {
      if (glossary._id + '' === req.params.id + '') {
        glossary.title = title
        return glossary
      } else {
        return glossary
      }
    })

    const userUpdate = await User.findByIdAndUpdate(req.user._id, { glossaries })

    if (!userUpdate) {
      return sendResponse(res, 500, 'Error to update user')
    }

    return sendResponse(res, 200, 'Glossary updated')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

router.delete('/:id', passport.authenticate('token'), async (req, res) => {
  try {
    if (req.user.glossaries.length === 0) {
      return sendResponse(res, 404, 'You don\'t have glossaries')
    }

    let glossaries = req.user.glossaries.find(glossary => glossary._id + '' !== req.params.id + '')

    if (glossaries === undefined) {
      glossaries = []
    }
    const userUpdate = await User.findByIdAndUpdate(req.user._id, { glossaries })

    if (!userUpdate) {
      return sendResponse(res, 500, 'Error to delete glossary')
    }

    return sendResponse(res, 200, 'Glossary deleted')
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Server error')
  }
})

export default router
