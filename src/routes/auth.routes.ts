import express from 'express';
import {
  register,
  login,
  protectedRoute,
} from '../controllers/auth/auth.controller'; // Adjust the path as needed
import auth from '../middlewares/auth.middleware'; // Import the auth middleware
import { addAdminValidators, loginValidators } from '../validators/validators';
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/register', addAdminValidators, register);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/login', loginValidators, login);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/protected', auth, protectedRoute);

export default router;
