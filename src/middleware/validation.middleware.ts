import HttpException from '@/exceptions/http.exception';
import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripunknown: true
        }
        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            )
            req.body = value
            next();
        } catch (e: any) {
            const errors: string[] = []
            e.details.forEach((error: HttpException) => {
                errors.push(error.message)
            })
        }
    }
}

export default validationMiddleware;