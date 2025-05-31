import mongoose, { Error }  from "mongoose";

export const dbmsConnnection = async() => {
    try{
        console.log('mongodb://appDB:27017/second-brain-1')
        await mongoose.connect('mongodb://appDB:27017/second-brain-1')
        console.log('connected to db')
    }catch(e:any){
        console.log(e.message)
    }

}