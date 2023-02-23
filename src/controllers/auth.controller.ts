import { NextFunction, Request, Response } from "express"
import { User } from '@prisma/client'
import { CreateUserDto } from "@/dtos/users.dto"
import AuthService from "@/services/auth.service"
import { TokenData } from "@/interfaces/auth.interface"

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body
      const signUpUserData: User = await this.authService.signup(userData)

      res.status(200).json({ data: signUpUserData, message: 'signup' })
    } catch (error) {
      next(error)
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body
      const { user, tokenData } = await this.authService.signin(userData)

      res.status(200).json({ user, tokenData, message: 'signin' })
    } catch (error) {
      next(error)
    }
  }

  public signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userData, tokenData }: { userData: User, tokenData: TokenData } = req.body
      const signOutUserData: User = await this.authService.signout(userData, tokenData)

      res.status(200).json({ data: signOutUserData, message: 'signout' })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController