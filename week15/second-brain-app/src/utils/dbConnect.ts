import mongoose, { Error }  from "mongoose";

const DB_URL:string = process.env.DB_URL ?? '';

export const dbmsConnnection = async() => {
    try{
        console.log(DB_URL)
        await mongoose.connect(DB_URL)
        console.log('connected to db')
    }catch(e:any){
        console.log(e.message)
    }

}