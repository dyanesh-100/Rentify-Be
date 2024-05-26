const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        street:{
            type: String,
        },
        city:{
            type: String,
        },
        latitude:{
            type: String,
        }, 
        longitude:{
            type:String
        }
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
},
{
    collection: 'users'
})

module.exports = mongoose.model('users', userSchema)