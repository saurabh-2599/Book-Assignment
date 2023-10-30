const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const mongoose = require('mongoose')
const app = require('./app')

//setting up database connection

mongoose.connect(process.env.DB_URL)
.then(res => console.log("Database successfully connected"))
.catch(err => console.log("Database connection failed"))

//make server start listening on port 9020

app.listen(process.env.PORT,() => {
    console.log("Server started on port "+process.env.PORT)
})