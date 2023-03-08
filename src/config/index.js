import { config } from 'dotenv'

config()

export const { NODE_ENV, PORT, SECRET_KEY } = process.env
