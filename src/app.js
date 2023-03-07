import express from 'express'
import { NODE_ENV, PORT } from './config'
import compression from 'compression'
import errorMiddleware from './middlewares/error.middleware'
import knex from './database'

class App {

    constructor(routes) {
        this.app = express()
        this.env = NODE_ENV || 'development'
        this.port = PORT || 3000

        this.connectToDatabase()
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeErrorHandling()
    }

    static listen() {
        this.app.listen(this.port, () => {
            console.log(`ENV: ${ this.env }`)
            console.log(`App listening on port: ${ this.port }`)
        })
    }

    connectToDatabase() {
        Model.knex(knex)
    }

    initializeMiddlewares() {
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({  extended: true }))
    }

    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        })
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}

export default App
