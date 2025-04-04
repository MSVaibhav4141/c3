export class ErrorHandeler extends Error{
    statusCode:number;
    constructor(message:string, statusCode: number){
        super(message)
        console.log(statusCode)
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }

}