import { Users } from '../models/users.model'
import { HttpException } from '../exceptions/HttpException'
import { hash, compare } from 'bcrypt'
import { SECRET_KEY } from '../config'
import { sign } from 'jsonwebtoken'

class AuthService {
    async register(userData) {
        if (!userData) throw new HttpException(400, 'There is no user data provided.')

        const user = await Users.query()
            .select()
            .from('users')
            .where('email', '=', userData.email)
            .first()
        if (user) throw new HttpException(400, `The email ${ userData.email } already exists.`)

        const hashedPassword = await hash(userData.password, 10)
        const registeredUserData = await Users.query()
            .insert({ ...userData, password: hashedPassword })
            .into('user')

        return registeredUserData
    }

    async login(userData) {
        if (!userData) throw new HttpException(400, 'There is no user data provided.')

        const user = await Users.query()
            .select()
            .from('users')
            .where('email', '=', userData.email)
            .first()
        if (!user) throw new HttpException(400, `The email ${ userData.email } does not exist.`)

        const isPasswordMatching = await compare(userData.password, user.password)
        if (!isPasswordMatching) throw new HttpException(400, 'The password does not match the email used.')

        const tokenData = this.createToken(user)
        const cookie = this.createCookie(tokenData)

        return { cookie, user }
    }

    async logout(userData) {
        if (!userData) throw new HttpException(400, 'There is no user data provided.')

        const user = await Users.query()
            .select()
            .from('users')
            .where('email', '=', userData.email)
            .first()
        if (!user) throw new HttpException(400, 'There is no user found.')

        return user
    }

    createToken(user) {
        const data = { id: user.id }
        const secretKey = SECRET_KEY
        const expiresIn = 60 * 60

        return { expiresIn, token: sign(data, secretKey, { expiresIn }) }
    }

    createCookie(tokenData) {
        return `Authorization=${ tokenData.token }; HttpOnly; Max-Age=${ tokenData.expiresIn };`
    }
}

export default AuthService
