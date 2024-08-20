import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/login',
  AuthControllers.loginUser,
);


export const AuthRoutes = router;
