const jwt = require("jsonwebtoken")
let refreshTokenCheck = function(refreshToken) {
    if (!refreshToken) {
        throw "A token is required for authentication"
    }
    try {
        jwt.verify(refreshToken, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);
    } catch (err) {
        throw "Invalid Token"
    }
    return jwt.verify(refreshToken, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET).sub
}
module.exports = refreshTokenCheck
