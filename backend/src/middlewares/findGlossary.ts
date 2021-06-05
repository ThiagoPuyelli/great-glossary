import sendResponse from '../utils/sendResponse'

export default (param: string) => {
  return (req, res, next) => {
    const glossary = req.body.glossaries.find(glossary => glossary._id + '' === req.params[param] + '')

    if (!glossary) {
      return sendResponse(res, 404, 'The glossary doesn\'t exist')
    }

    req.body.glossary = glossary

    next()
  }
}
