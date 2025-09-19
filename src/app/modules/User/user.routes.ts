import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('/',UserController.createAdminUser);
router.get('/',UserController.createAdminUser);
export const userRoutes = router;