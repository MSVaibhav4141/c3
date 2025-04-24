import { Request, Router } from "express";
import { client } from ".";

export const router = Router()

router.route('/create').post(async(req, res) => {
    try{
    const user = await client.user.create(
        {
            data:{
                username:'vaibhav',
                email:'v@g.com',
                password:'12334',
            }
        }
    )
    res.status(200).json({
        user
    })
}catch(e){
    console.log(e)
}
})

router.route('/update').post(async(req, res) => {
    try{
const user = await client.user.update({
        where:{
            id:1
        },
        data:{
            username:'VAAIBBHHAAV',
        }
    })

    res.status(200).json({
        user
    })
}catch(e){
    console.log(e)
}
})

router.route('/find/:id').get(async(req, res) => {
    try{
    const user = await client.user.findFirst({
        where:{
            id:parseInt(req.params.id )
        },
        select:{
            username:true,
            todo:true
        }
    })
    res.status(200).json({
        user
    })
}catch(e){
    console.log(e)
}
})