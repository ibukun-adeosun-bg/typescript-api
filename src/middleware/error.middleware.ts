import { Request, Response, NextFunction } from 'express'
import HttpException from '@/exceptions/http.exception'

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errorStatus = error.status || 500
    const errorMessage = error.message || "Something went wrong!!!"
    res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage
    })
}

export default errorMiddleware