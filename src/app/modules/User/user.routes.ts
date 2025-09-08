import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('/user',UserController.createAdminUser);
router.get('/user',UserController.createAdminUser);
export const userRoutes = router;