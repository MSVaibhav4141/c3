import { Request, Router } from "express";
import { client } from "./utils/dbConnect";

export const router = Router()

router.route('/multiple/query').post(async (req , res) => {
    try{
    const {username , email, password } = req.body;
    const {city, country, street, pincode} = req.body;

    const insertQuery1 = `insert into users (username , email, password) values ($1, $2, $3) returning id`
    const insertQuery2 = `insert into addresses (user_id , city, country, street, pincode) values ($1, $2, $3, $4, $5)`

    await client.query('BEGIN')  //--> wraped in a transaction
    const resultFromQuery1 = await client.query(insertQuery1, [username, email, password]);
    
    const resultFromQuery2 = await client.query(insertQuery2, [resultFromQuery1.rows[0].id , city, country, street, pincode]);
    await client.query('COMMIT') //--> wraped in a transaction
    
    res.status(200).json({
        result : resultFromQuery2.rows
    })
}catch(e){
    console.log(e)
}
    
})

router.route('/using/joind/:id').get(async (req:Request<{id:string}> , res) => {
    try{
    const {id} = req.params;


    const insertQuery1 = `select * from users u join addresses as a on u.id = a.user_id where u.id = $1`
    const result  = await client.query(insertQuery1,[id])

    res.status(200).send({
        rows:result.rows
    })

}catch(e){
    console.log(e)
}
    
})

//However this approach is not good reason being is the backend crashes beore second query it will result in partial record 
// Get push to the db hence causing inconsistency expecially in bank related project where if transaction from one end is deducted 
// it must get reflected to the other as well as added cost for that we use TRANSACTION