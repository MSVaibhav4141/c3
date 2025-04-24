import { Router } from "express";
import { client } from "./utils/dbConnect";

export const router = Router()



router.route('/insert/users').post(async(req, res) => {
    try{
    const {username, email, password} = req.body;

    const insertQuery = `INSERT INTO users (username ,email , password) VALUES($1 , $2, $3)`  //This is vulnerable for sql injection
    console.log(insertQuery)
    const result = await client.query(insertQuery, [username, email, password])
    console.log(result)
    }catch(e){
        console.log(e)
    }
})  
router.route('/insert/addreses').post(async(req, res) => {
    try{
    const {userId, city, country, street, pincode} = req.body;

    const insertQuery = `INSERT INTO addresses (user_id, city, country, street, pincode) VALUES($1 , $2, $3, $4, $5)`  //This is vulnerable for sql injection
    
    const values = [userId, city, country, street, pincode];

    const result = await client.query(insertQuery,values);
    
    res.status(200).json({
        result: result.rows
    })
    
    }catch(e){
        console.log(e)
    }
})  