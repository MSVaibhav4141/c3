import  { RequestHandler} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';

export const auth: RequestHandler = (req, res, next) => {
    try{
    const token = req.headers['authorization'];

    interface JwtToken extends JwtPayload{
        id:string
    }
    const decodedToken = jwt.verify(token!, "MYSECRET") as JwtToken ;
    
    if(decodedToken){
        req.userId = decodedToken.id;
        next();
    }
}catch(e:any){
    res.status(401).json({
        message:`You are not authorized , ${e.message}`
    })
}
    
}