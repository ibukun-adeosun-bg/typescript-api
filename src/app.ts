import express, { Application } from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import Controller from '@/interfaces/controller.interface'
import ErrorMiddleware from '@/middleware/error.middleware'

class App {
    public express: Application;
    public port: number
    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet())
        this.express.use(morgan('dev'))
        this.express.use(cors())
        this.express.use(compression())
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use("/api", controller.router)
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware)
    }

    private initialiseDatabaseConnection(): void {
        mongoose.connect(
            `${process.env.MONGO_URL}`
        )
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is currently running on port ${this.port}`);
        })
    }
}

export default App