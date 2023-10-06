import type { AxiosInstance } from "axios";
import type IAuthService from "../interface/IAuthService";
import type UsersModel from "../models/UsersModel";

export enum AuthServiceAxiosPath{
  BASE_URL = '',
  POST_LOGIN = '',
  POST_LOGOUT = '',
  GET_isAUTHENTICATED = '',
  POST_REGISTER = '',
  POST_CHANGE_PASSWORD = ''
}

export enum AuthServiceErrorPath{
  POST_LOGIN_ERROR = '',
  POST_LOGOUT_ERROR = '',
  GET_isAUTHENTICATED_ERROR = '',
  POST_REGISTER_ERROR = '',
  POST_CHANGE_PASSWORD_ERROR = ''
}

export class AuthService implements IAuthService{
  private axios! : AxiosInstance;
  private users: UsersModel[] = [];
  login(username: string, password: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  logout(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isAuthenticated(token: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  register(user: UsersModel): Promise<UsersModel> {
    throw new Error("Method not implemented.");
  }
  changePassword(username: string, newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}