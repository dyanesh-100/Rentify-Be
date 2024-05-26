const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    location: {
        doorNo: {
            type: String,
            required: true
        },
        street:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        latitude:{
            type: String,
        }, 
        longitude:{
            type:String
        }
    },
    bedrooms: {
        type: Number,
        required: true, 
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        require: true
    }, 
    hospitalsNearby: [{
        type: String,
    }],
    schoolsNearby: [{
        type: String
    }],
    collegesNearby: [{
        type: String
    }]

},
{
    collection: 'properties'
})

module.exports = mongoose.model('properties', propertySchema)