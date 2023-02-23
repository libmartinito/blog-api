import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { PrismaClient, User } from '@prisma/client'
import { SECRET_KEY } from '@config'
import { CreateUserDto } from '@/dtos/users.dto'
import { HttpException } from '@/exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface'

class AuthService {
  public client = new PrismaClient()
  public users = this.client.user
  public tokens = this.client.token

  public async signup(userData: CreateUserDto): Promise<User> {
    if (!userData) throw new HttpException(400, "User data is empty.")

    const user: User | null = await this.users.findUnique({ where: { email: userData.email } })
    if (user) throw new HttpException(400, `The email ${userData.email} already exists.`)

    const hashedPassword = await hash(userData.password, 10)
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } })

    return createUserData
  }

  public async signin(userData: CreateUserDto): Promise<{ user: User, tokenData: TokenData }> {
    if (!userData) throw new HttpException(400, "User data is empty.")

    const user: User | null = await this.users.findUnique({ where: { email: userData.email } })
    if (!user) throw new HttpException(400, `The email ${userData.email} was not found.`)
    
    const isPasswordMatching: boolean = await compare(userData.password, user.password)
    if (!isPasswordMatching) throw new HttpException(400, "Password does not match email.")

    const tokenData = this.createToken(user)

    return { user, tokenData }
  }

  public async signout(userData: User, tokenData: TokenData): Promise<User> {
    if (!userData) throw new HttpException(400, "User data is empty.")

    const user: User | null = await this.users.findFirst({ where: { email: userData.email } })
    if (!user) throw new HttpException(400, "User does not exist.")

    await this.tokens.deleteMany({ where: { token: tokenData.token } })

    return user
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id }
    const secretKey: string = SECRET_KEY as string

    return { token: sign(dataStoredInToken, secretKey) }
  }
}

export default AuthService