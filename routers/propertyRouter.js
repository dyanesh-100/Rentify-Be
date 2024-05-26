const express = require("express")
const { addProperty, getMyProperties, updateProperty, deleteProperty,getAllProperties } = require("../controllers/propertyController")
const authenticateUser = require("../middleware/authenticateUser")

const route = express()

//Seller
route.post('/add', authenticateUser, addProperty)
route.get('/my_property', authenticateUser, getMyProperties)
route.patch('/update', authenticateUser, updateProperty)
route.delete('/delete', authenticateUser, deleteProperty)

//Buyer
route.get('/', authenticateUser, getAllProperties)

module.exports = route