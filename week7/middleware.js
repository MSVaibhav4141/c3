const jwt = require('jsonwebtoken')
const JWT_SECRET = 'MYHOOD'

const auth = (req, res, next) => {    
    const decodedToken = jwt.verify(req.headers.authorization,JWT_SECRET)

    if(req.email === decodedToken.email){
        next()
    }else{
        return res.status(403).json({
            message:"Invalid credentials"
        })
    }
}

module.exports = auth