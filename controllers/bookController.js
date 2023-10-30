const bookModel = require('../models/Book')
const {errorHandler,successHandler} = require('../utils/response-handler')

exports.createNewBook = async(req,res,next) => {
    try{
        const {title} = req.body
        //case insensitive search
        const isBookAlreadyExist = await bookModel.findOne({title}).collation({strength:2,locale:'en'})
       
        if(isBookAlreadyExist){
            return errorHandler(res,400,{message:"Book with this name already exist"})
        }
        const newBook = await bookModel.create({...req.body})
        if(!newBook){
            return errorHandler(res,500,{message:"Something went wrong"})
        }
        return successHandler(res,201,newBook)
    }
    catch(err){
        console.log(err.message)
        return errorHandler(res,500,{message:"Something went wrong"})
    }
}

exports.getAllBook = async(req,res,next) => {
    try{
        let {page,limit} = req.query
        page = page || 1
        limit = limit || 10
        const skipDocuments = (page-1)*limit
        const books = await bookModel.find({}).skip(skipDocuments).limit(limit)
        if(books.length <=0){
            return errorHandler(res,404,{message:"No book found.Please add some book"})
        }
        return successHandler(res,200,books)
    }
    catch(err){
        return errorHandler(res,500,{message:"Something went wrong"})
    }
}

exports.getBookDetails = async(req,res,next) => {
    try{
        const {bookId} = req.params
        if(!bookId){
            return errorHandler(res,400,{message:"Book id is required to fetch book details"})
        }
        const book = await bookModel.findById(bookId)
        if(!book){
            return errorHandler(res,404,{message:"No book with this id found"})
        }
        return successHandler(res,200,book)
    }
    catch(err){
        return errorHandler(res,500,{message:"Something went wrong"})
    }
}

exports.updateBook = async(req,res,next) => {
    try{
        const {bookId} = req.params
        if(!bookId){
            return errorHandler(res,400,{message:"Book id is required to update book details"})
        }
        // if title is updating check if any other book with this same title exist
        if(req.body.title){
            const isTitleTaken =  await bookModel.findOne({
                title:/`${req.body.title}`/i
            })
            if(isTitleTaken && isTitleTaken._id !== bookId){
                return errorHandler(res,400,{message:"Book with this title already exist"})
            }

        }
        //_id cannot be updated
        delete req.body._id
        const updatedBook = await bookModel.findByIdAndUpdate(bookId,req.body,{new:true})
        if(!updatedBook){
            return errorHandler(res,404,{message:"No such book found"})
        }
        return successHandler(res,202,updatedBook)
    }
    catch(err){
        return errorHandler(res,500,{message:"Something went wrong"})
    }
}

exports.deleteBook = async(req,res,next) => {
    try{
        const {bookId} = req.params
        if(!bookId){
            return errorHandler(res,400,{message:"Book id is required to delete book details"})
        }
        const book = await bookModel.findByIdAndDelete(bookId)
        if(!book){
            return errorHandler(res,404,{message:"No book with this id found"})
        }
        return successHandler(res,203,null)
    }
    catch(err){
        return errorHandler(res,500,{message:"Something went wrong"})
    }
}