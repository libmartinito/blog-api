import { Users } from '../models/users.model'
import { HttpException } from '../exceptions/HttpException'
import { hash } from 'bcrypt'

class AuthService {
    async register(userData) {
        if (!userData) throw new HttpException(400, 'There is no user data provided.')

        const user = await Users.query()
            .select()
            .from('users')
            .where('email', '=', userData.email)
            .first()
        if (!user) throw new HttpException(400, `The email ${ userData.email } already exists.`)

        const hashedPassword = await hash(userData.password, 10)
        const registeredUserData = await Users.query()
            .insert({ ...userData, password: hashedPassword })
            .into('user')

        return registeredUserData
    }
}

export default AuthService
