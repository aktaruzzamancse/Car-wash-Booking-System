import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import config from '../../config';
const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  console.log(user);
  //checking if the password is correct
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    userId: user.id,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const userData = user;
  userData.password = "";
  return {
    accessToken,
    user:userData
  };



};



export const AuthServices = {
  loginUser,

};
