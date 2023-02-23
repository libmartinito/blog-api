import { User } from '@prisma/client'

export interface DataStoredInToken {
  id: number
}

export interface TokenData {
  token: string
}