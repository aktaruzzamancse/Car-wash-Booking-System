import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization as string;
    if(token){
      token = token.replace(/^Bearer\s+/, "");
    }
    
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // token varify
    jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
      if(err){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const { role } = decoded as JwtPayload;
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized  hi!',
        );
      }

      
      req.user = decoded as JwtPayload;
      next();
    });
    
   
  });
};

export default auth;