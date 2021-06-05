import sendResponse from '../utils/sendResponse'

export default (req, res, next) => {
  const glossaries = req.user.glossaries

  if (!glossaries || glossaries.length === 0) {
    return sendResponse(res, 500, 'You don\'t have glossaries')
  }

  req.body.glossaries = glossaries
  next()
}
