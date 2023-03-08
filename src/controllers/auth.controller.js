import { AuthService } from '../services/auth.service'

class AuthController {
    authService = new AuthService()

    register = async (req, res, next) => {
        try {
            const userData = req.body()
            const registeredUserData = await this.authService.register(userData)

            res.status(200).json(registeredUserData)
        } catch(error) {
            next(error)
        }
    }
}

export default AuthController
