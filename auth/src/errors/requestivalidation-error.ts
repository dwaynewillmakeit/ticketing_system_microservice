import { ValidationError } from 'express-validator'
import {CustomError} from './custom-error'

export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super("Request validation Error");

        //Only because we are extending a buit JS in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);

        
    }

    serializeErrors()
    {
        return this.errors.map(err=>{
            return {message: err.msg, field: err.param}
        })
    }
}