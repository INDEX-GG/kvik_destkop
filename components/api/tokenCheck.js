const jwt = require("jsonwebtoken")
let tokenCheck = function(token) {
    if (!token) {
        throw "A token is required for authentication"
    }
    try {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    } catch (err) {
        throw "Invalid Token"
    }
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
}
module.exports = tokenCheck
