import mongoose, { Error }  from "mongoose";

export const dbmsConnnection = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/second-brain-1')
        console.log('connected to db')
    }catch(e:any){
        console.log(e.message)
    }

}