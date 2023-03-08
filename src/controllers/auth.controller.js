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

    login = async (req, res, next) => {
        try {
            const userData = req.body()
            const { cookie, user } = await this.authService.login(userData)

            res.setHeader('Set-Cookie', [cookie])
            res.status(200).json(user)
        } catch(error) {
            next(error)
        }
    }

    logout = async (req, res, next) => {
        try {
            const userData = req.body()
            const loggedOutUserData = await this.authService.logout(userData)

            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
            res.status(200).json(loggedOutUserData)
        } catch(error) {
            next(error)
        }
    }
}

export default AuthController
