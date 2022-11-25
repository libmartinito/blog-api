import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT as string | "3000";

app.listen(parseInt(port), () => {
    console.log(`Server is running at ${port}`);
});
