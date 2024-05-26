const jwt = require("jsonwebtoken")

const authenticateUser = (request, response, next) => {
    const authHeader = request.headers.authorization
    const authToken = authHeader && authHeader.split(" ")[1]
    console.log(authToken)
    if(!authToken){
        return response.status(404).send({message: "Token not found"})
    }
    jwt.verify(authToken, process.env.JWT_TOKEN, (error, data) => {
        if(error){
            return response.status(404).send({message: "User not authorized"})
        }
        console.log(data)
        request.user = data
    })
    next()
}

module.exports = authenticateUser