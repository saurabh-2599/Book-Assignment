const router = require('express').Router()
const bookController = require('../controllers/bookController')
const bookValidator = require('../validators/bookValidator')

router
.route('/')
.post(bookValidator.validateBookData,bookController.createNewBook)
.get(bookController.getAllBook)



router
.route('/:bookId')
.get(bookController.getBookDetails)
.patch(bookValidator.validateBookUpdate,bookController.updateBook)
.delete(bookController.deleteBook)

module.exports = router