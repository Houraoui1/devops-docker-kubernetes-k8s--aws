import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { userValidationRules, validate } from '../middleware/validation';

const router = express.Router();

router.post('/register', userValidationRules.register, validate, registerUser);
router.post('/login', userValidationRules.login, validate, loginUser);

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

router.get('/', authenticate, authorize('admin'), getUsers);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
