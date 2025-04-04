import { NextFunction, Request, Response } from "express";
import { ErrorHandeler } from "./errorHandeler";

const isErrorHandler = (err: any): err is ErrorHandeler => {
    return err instanceof ErrorHandeler;
};

export const errorCatcher = (err:Error, req:Request , res: Response, next: NextFunction):void => {

    if(isErrorHandler(err)){
        res.status(err.statusCode).json({ error: err.message });

    } else {
        res.status(500).json({ error: err.message });
    }
}