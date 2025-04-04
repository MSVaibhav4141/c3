import { NextFunction, Request, Response } from "express";

export const asyncErrorHandler = <
    P = unknown, 
    ResBody = unknown, 
    ReqBody = unknown, 
    ReqQuery = unknown,
>(
    fn: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<void> | void
) => {
    return (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>,
        next: NextFunction
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};