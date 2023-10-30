const express = require('express')
const morgan = require('morgan')
const bookRouter = require('./routes/bookRoute')
//starting express server

const app = express()

app.use(express.json())
//request logging
app.use(morgan('dev'))


//mount request
app.use('/api/v1/books',bookRouter)



//unhandled route handled
app.all("*",(req,res,next) => {
    return res.status(404).json({
        status:"FAIL",
        message:"PATH NOT FOUND"
    })
})

module.exports = app