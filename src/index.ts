import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router as authRoute } from './routes/auth.route';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT as string | "3000";

app.use(cors());
app.use(express.json());
app.use(authRoute);

app.listen(parseInt(port), () => {
    console.log(`Server is running at ${port}`);
});
