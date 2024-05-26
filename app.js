require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routers/userRouter")
const propertyRouter = require("./routers/propertyRouter")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/api/v1',(request, response) => {
    response.status(200).send({message: "Server running successfully"})
})

app.use('/api/v1/rentify', userRouter)
app.use('/api/v1/rentify/property', propertyRouter)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.listen(PORT, () => {
    console.log("Server Running");
})