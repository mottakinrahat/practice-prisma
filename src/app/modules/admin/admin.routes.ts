
import express  from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/admins', AdminController.getAllAdminFromDB);
router.get('/admins/:id', AdminController.getSingleAdmin);
router.patch('/admins/:id', AdminController.updateAdminData);
router.delete('/admins/:id', AdminController.deleteAdminData);
router.delete('/admins/soft/:id', AdminController.softDeleteAdminData);

export const adminRoutes = router;