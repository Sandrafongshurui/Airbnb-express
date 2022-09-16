const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    // get Authentication header value
    //this header is set in fetch in FE + set the token taken from the  local/cookies
    //e,g  Authorization: `Bearer ${token}`
    //it will pass to the req routes
    const authzHeader = req.header('Authorization')
    if (!authzHeader) {
        return res.status(401).json({
        message: "Authentication details empty"//fe did not send the token back
        })
    }

    // check for "Bearer " 
    if (authzHeader.slice(0, 7) !== 'Bearer ') {
        return res.status(401).json({
          message: "Invalid auth type" //fe did not set the bearer token, set other type
        })
    }
    
    // get value after "Bearer ", the actual JWT token
    const token = authzHeader.slice(7)
    if (token.length === 0) {
        return res.status(401).json({
            message: "Invalid auth token"//token value from FE is empty 
        })
    }

    // set global var userAuth if JWT is valid
    //check to see if it got tampered with by comparing secret and the token(encryption involves the token)
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (verified) {
        res.locals.userAuth = verified//replace the userAuth or set it
        console.log("veriredfied", verified)
        next()
        return
    }

    return res.status(401).json({
        message: "Invalid auth token"
    })
}

module.exports = authMiddleware