const express = require("express")
const { userSignup, userLogin, getSellerDetails, getUserDetails  } = require("../controllers/userController")
const authenticateUser = require("../middleware/authenticateUser")

const route = express()

route.post('/signup', userSignup)
route.post('/login', userLogin)

//Buyer
route.post('/user', getUserDetails)
route.get('/seller',authenticateUser, getSellerDetails)

module.exports = route