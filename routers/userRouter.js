const express = require("express")
const { userSignup, userLogin } = require("../controllers/userController")
const authenticateUser = require("../middleware/authenticateUser")

const route = express()

route.post('/signup', userSignup)
route.post('/login', userLogin)



module.exports = route