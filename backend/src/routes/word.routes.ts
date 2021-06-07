import { Router } from 'express'
import User from '../models/User'
import passport from 'passport'
import validateReq from '../middlewares/validateReq'
import { saveWord } from '../validators/word'
import sendResponse from '../utils/sendResponse'
import verifyGlossary from '../middlewares/verifyGlossaries'
import findGlossary from '../middlewares/findGlossary'

const router = Router()

router.get('/:id/:letter',
  passport.authenticate('token'),
  verifyGlossary,
  findGlossary('id'),
  async (req, res) => {
    try {
      const glossary = req.body.glossary

      glossary.words = glossary.words.filter(word => word.word.charAt(0).toUpperCase() === req.params.letter)

      if (!glossary.words) {
        return sendResponse(res, 404, 'Don\'t find words')
      }

      return sendResponse(res, 200, { glossary })
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

router.get('/id/:id/:word',
  passport.authenticate('token'),
  verifyGlossary,
  findGlossary('id'),
  async (req, res) => {
    try {
      const glossary = req.body.glossary

      const word = glossary.words.find(word => word.word.toLowerCase() === req.params.word.toLowerCase())

      if (!word) {
        return sendResponse(res, 404, 'The word doesn\'t exist')
      }

      return sendResponse(res, 200, { word })
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

router.post('/:id',
  passport.authenticate('token'),
  validateReq(saveWord, 'body'),
  verifyGlossary,
  async (req, res) => {
    try {
      const glossaries = req.body.glossaries

      let verify: boolean = false
      for (const i in glossaries) {
        if (glossaries[i]._id + '' === req.params.id + '') {
          const { word, definition } = req.body
          glossaries[i].words.push({ word, definition })
          verify = true
        }
      }

      if (!verify) {
        return sendResponse(res, 404, 'The glossary doesn\'t exist')
      }

      const userUpdate = await User.findByIdAndUpdate(req.user._id, { glossaries })

      if (!userUpdate) {
        return sendResponse(res, 500, 'Error to save word')
      }

      return sendResponse(res, 200, 'Word saved')
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

router.put('/:id/:word',
  passport.authenticate('token'),
  validateReq(saveWord, 'body'),
  verifyGlossary,
  findGlossary('id'),
  async (req, res) => {
    try {
      const glossary = req.body.glossary

      if (!glossary.words || glossary.words.length === 0) {
        return sendResponse(res, 404, 'You don\'t have words')
      }

      let verify: boolean = false

      for (const i in glossary.words) {
        if (glossary.words[i].word.toLowerCase() === req.params.word.toLowerCase()) {
          const { word, definition } = req.body
          glossary.words[i] = { word, definition }
          verify = true
        }
      }

      if (!verify) {
        return sendResponse(res, 404, 'The word doesn\'t exist')
      }

      const glossaries = req.body.glossaries

      let change: boolean = false
      for (const i in glossaries) {
        if (glossaries[i]._id + '' === req.params.id + '') {
          glossaries[i] = glossary
          change = true
        }
      }

      if (!change) {
        return sendResponse(res, 500, 'Error to find glossary')
      }

      const userUpdate = await User.findByIdAndUpdate(req.user._id, { glossaries })

      if (!userUpdate) {
        return sendResponse(res, 500, 'Error to update word')
      }

      return sendResponse(res, 200, 'Word updated')
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

router.delete('/:id/:word',
  passport.authenticate('token'),
  verifyGlossary,
  findGlossary('id'),
  async (req, res) => {
    try {
      const glossary = req.body.glossary

      glossary.words = glossary.words.filter(word => word.word + '' !== req.params.word + '')

      if (!glossary.words) {
        return sendResponse(res, 500, 'Error to delete word')
      }

      const glossaries = req.body.glossaries

      let verify: boolean = false
      for (const i in glossaries) {
        if (glossaries[i]._id + '' === glossary._id + '') {
          glossaries[i] = glossary
          verify = true
        }
      }

      if (!verify) {
        return sendResponse(res, 500, 'Error to delete word')
      }

      const userUpdate = await User.findByIdAndUpdate(req.user._id, { glossaries })

      if (!userUpdate) {
        return sendResponse(res, 500, 'Error to update user')
      }

      return sendResponse(res, 200, 'Word deleted')
    } catch (err) {
      return sendResponse(res, 500, err.message || 'Server error')
    }
  })

export default router
