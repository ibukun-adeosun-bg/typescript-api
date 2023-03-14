import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/interfaces/controller.interface'
import HttpException from '@/exceptions/http.exception'
import validationMiddleware from '@/middleware/validation.middleware'
import validate from '@/validations/post.validation'
import PostService from '@/services/post.services'

class PostController implements Controller {
    public path = '/posts'
    public router = Router()
    private PostService = new PostService();
    constructor() {
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body)
            res.status(201).json({ post })
        } catch (error) {
            next(new HttpException(400, 'Cannot Create Post'))
        }
    }
}

export default PostController