const propertyModel = require("../models/propertyModel")
const userModel = require("../models/userModel")

const addProperty = async(request,response) => {
    const propertyData = request.body
    const userData = request.user
    try{
        if(userData.role === "seller"){
            const addedPropertyData = await propertyModel.create(propertyData)
            return response.status(201).send(addedPropertyData)
        }
        return response.status(404).send({message: "Not an authorized Seller"})
    }
    catch(error){
        response.status(500).send({message: error.message})
    }
}
//Seller
const getMyProperties = async(request, response) => {
    const userData = request.user
    console.log(userData)
    try{
        if(userData.role === "seller"){
            const {_id} = await userModel.findOne({email: userData.email})
            console.log("id", _id)
            if(_id){
                const properties = await propertyModel.find({owner: _id})
                console.log("properties", properties)
                if(properties.length === 0){
                    return response.status(404).send({message: "No properties found under this seller"})
                }
                return response.status(200).send(properties)
            }
        }
        return response.status(401).send({message: "Not an authorized Seller"})
    } 
    catch(error){
        return response.status(500).send({message: error.message})
    }
}
//Seller
const updateProperty = async(request, response) => {
    const userData = request.user
    const propertyData = request.body
    try{
        if(userData.role === "seller"){
            const validProperty = await propertyModel.findOne({_id: propertyData._id})
            if(validProperty){
                const updatedProperty = await propertyModel.findOneAndUpdate({_id: validProperty._id}, {$set: propertyData}, {new: true})
                response.status(200).send(updatedProperty)
            }
            else{
                return response.status(404).send({message: "Not a valid property"})
            }
        }
        return response.status(401).send({message: "Not an authorized seller"})
    }
    catch(error){
        response.status(200).send({message: error.message})
    }
}
//Seller
const deleteProperty = async(request, response) => {
    const userData = request.user
    const propertyData = request.body
    try{
        if(userData.role === "seller"){
            const validProperty = await propertyModel.findOne({_id: propertyData._id})
            if(validProperty){
                const deletedProperty = await propertyModel.findOneAndDelete({_id: validProperty._id})
                return response.status(200).send({message: "Property Deleted Successfully", deletedProperty})
            }
            else{
                return response.status(404).send({message: "Not a valid property"})
            }
        }
        return response.status(401).send({message: "Not an authorized seller"})
    }
    catch(error){
        response.status(200).send({message: error.message})
    }
}
//Buyer
const getAllProperties = async(request, response) => {
    const userData = request.user
    try{
        if(userData.role === "buyer"){
            const properties = await propertyModel.find()
            return response.status(200).send(properties)
        }
        else{
            return response.status(401).send({message: "Not an authorized Buyer"})
        }
    }
    catch(error){
        response.status(200).send({message: error.message})
    }
}

//Buyer
const filterProperty = async(request, response) => {
    const userData = request.user
    const filterData = request.body
    try{
        const filteredProperties = await propertyModel.find(
            {$match: {bedrooms: filterData.bedrooms, bathrooms: filterData.bathrooms}}
        )
        return response.status(200).send(filteredProperties)
    }
    catch(error){
        response.status(200).send({message: error.message})
    }
}
module.exports = {addProperty, getMyProperties, updateProperty, deleteProperty, getAllProperties, filterProperty}