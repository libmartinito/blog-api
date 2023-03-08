import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

class AuthRoute {
    path = '/'
    router = Router()
    authController = new AuthController()
    
    constructor() {
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.post(`${ this.path }register`, this.authController.register)
        this.router.post(`${ this.path }login`, this.authController.login)
        this.router.post(`${ this.path }logout`, this.authController.logout)
    }
}

export default AuthRoute
