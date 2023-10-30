const successHandler = (res,statusCode,data) => {
    res.status(statusCode).json({
        status:"SUCCESS",
        data
    })
}

const errorHandler = (res,statusCode,err) => {
    res.status(statusCode).json({
        status:"FAIL",
        message:err.message || "Something went wrong"
    })
}

module.exports = {
    successHandler,errorHandler
}