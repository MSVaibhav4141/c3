const jwt = require('jsonwebtoken')
const { asyncErrorHandeler } = require('./errorHadeler')
const JWT_SECRET = 'MYHOOD'

const auth = asyncErrorHandeler(async(req, res, next) => {   
   
    const decodedToken = jwt.verify(req.headers.authorization,JWT_SECRET)
    if(decodedToken){
        req.userId = decodedToken.id
        next()
    }else{
        return res.status(403).json({
            message:"Invalid credentials"
        })
    }
})

module.exports = auth