import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from '../errors/requestivalidation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction)=>{

        if(err instanceof RequestValidationError)
        {
            const formattedErrors = err.errors.map(error =>{
                return {message: error.msg, field: error.param}
            });
            console.log("Request Validation Error");

            return res.status(400).send({errors: formattedErrors});
        }

        if(err instanceof DatabaseConnectionError)
        {
            console.log("Database Connection Errr");
          return  res.status(500).send( {errors:[ {message: err.reason } ]} );
        }

        return res.status(400).send({errors:[{message:"Something went wrong"}]})
    };