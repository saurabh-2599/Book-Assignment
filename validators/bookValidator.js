const joi = require('joi')
const {errorHandler} = require('../utils/response-handler')
exports.validateBookData = async(req,res,next) => {
    const schema = joi.object({
        title:joi.string().required(),
        bookAuthor:joi.string().required(),
        summary:joi.string().required(),
        publisher:joi.string().optional(),
        publishDate:joi.string().optional()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return errorHandler(res,500,error)
    }
    next();
}

exports.validateBookUpdate = async(req,res,next) => {
    const schema = joi.object({
        title:joi.string().optional(),
        bookAuthor:joi.string().optional(),
        summary:joi.string().optional(),
        publisher:joi.string().optional(),
        publishDate:joi.string().optional()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return errorHandler(res,500,error)
    }
    next();
}


