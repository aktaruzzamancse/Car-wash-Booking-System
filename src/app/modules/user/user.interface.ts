 
import {  Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface User {
  [x: string]: any;
  name: string;
  password: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  isDeleted: boolean;
};
export interface UserModelT extends Model<User> {
  
  //Exiting User checking
  isUserExistsByCustomEmail(email: string): Promise<User>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
