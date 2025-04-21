import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    accountType: boolean;
    save(): Promise<IUser>;
  }

const userScehma = new mongoose.Schema<IUser>({
    name:{
        type:String,
        unique:true,
        require:true
    },
    username :{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        select:false,
        unique:true,
        require:true,
    },
    accountType:{
        type:Boolean,
        default:false
    }
})

userScehma.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }

    const hash = await bcrypt.hash(this.password!, 10)
    this.password = hash
    next();
})

export const User = model<IUser>('User', userScehma);