import { Router } from 'express';
import {
  loadData,
  deleteAllUsers,
  deleteUser,
  getUser,
  addUser,
} from '../controllers/userController';

const router = Router();

router.get('/load', loadData);
router.delete('/users', deleteAllUsers);
router.delete('/users/:userId', deleteUser);
router.get('/users/:userId', getUser);
router.put('/users', addUser);

export default router;
