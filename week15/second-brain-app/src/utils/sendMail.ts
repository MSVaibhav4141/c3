import nodemailer from 'nodemailer'
import { asyncErrorHandler } from './asyncErrorCatcher';
import { ErrorHandeler } from './errorHandeler';

const user = process.env.SMTP_MAIL
const password = process.env.SMTP_PASS

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  });

type MailType = {
    reciver:string,
    html:string
}

export const sendMail = async(args:MailType) => {
    try{
         await transporter.sendMail({
            from: user, 
            to: args.reciver, 
            subject: 'BrainlySB password reset request',
            html: args.html, 
          });
    }catch(e:any){
        throw new ErrorHandeler(e.message, 400)
    }
    }
