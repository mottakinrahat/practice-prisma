
import express  from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/admins', AdminController.getAllAdminFromDB);
export const adminRoutes = router;