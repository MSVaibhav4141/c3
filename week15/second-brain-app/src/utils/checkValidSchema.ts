import {z, ZodTypeAny} from 'zod';
import { ErrorHandeler } from './errorHandeler';
import { fromZodError } from 'zod-validation-error';

export const checkValidSchema = <TData>(bodyData: TData, zSchema:ZodTypeAny) => {
     const isValid = zSchema.safeParse(bodyData);
     if(!isValid.success){
        throw new ErrorHandeler(fromZodError(isValid.error).message, 400)
     }
}

