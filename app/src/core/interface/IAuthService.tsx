import type UsersModel from "../models/UsersModel";

export default interface IAuthService{
  login(username: string, password:string): Promise<any>;
  logout(token: string): Promise<void>;
  isAuthenticated(token: string): Promise<boolean>;
  register(user: UsersModel): Promise<UsersModel>;
  changePassword(username: string, newPassword:string): Promise<void>;
}