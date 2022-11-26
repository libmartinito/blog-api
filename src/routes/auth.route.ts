import express, { Router } from 'express';
import * as auth from '../controllers/auth.controller';

export const router: Router = express.Router();

router.post('/v1/register', auth.register);
router.post('/v1/login', auth.login);
