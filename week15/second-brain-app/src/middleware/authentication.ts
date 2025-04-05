import  { RequestHandler} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';

export const auth: RequestHandler = (req, res, next) => {
    try{
    const token = req.headers['authorization'];
    const JWT_SECRET= process.env.JWT_SECRET as string;
    interface JwtToken extends JwtPayload{
        id:string
    }
    const decodedToken = jwt.verify(token!, JWT_SECRET) as JwtToken ;
    
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