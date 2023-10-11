import type { AxiosInstance } from "axios";
import axios from "axios";
import type IAuthService from "../interface/IAuthService";
import type UsersModel from "../models/UsersModel";

export enum AuthServiceAxiosPath{
  BASE_URL = 'http://localhost:3001',
  POST_LOGIN = '/users/',
  POST_LOGOUT = '',
  GET_isAUTHENTICATED = '',
  POST_REGISTER = '/users/authCreateUser/',
  POST_CHANGE_PASSWORD = ''
}

export enum AuthServiceErrorPath{
  POST_LOGIN_ERROR = '/error-login/:all',
  POST_LOGOUT_ERROR = '',
  GET_isAUTHENTICATED_ERROR = '',
  POST_REGISTER_ERROR = '/error-register',
  POST_CHANGE_PASSWORD_ERROR = ''
}

export class AuthService implements IAuthService{
  private axios! : AxiosInstance;
  private users: UsersModel[] = [];

  constructor(){
    this.loadAuth();
  }
  private async loadAuth(): Promise<void>{
    this.axios = axios.create({
      baseURL: AuthServiceAxiosPath.BASE_URL,
    });
  }

  async login(username: string, password: string): Promise<UsersModel | null> {
    try {
      const response = await this.axios.get(AuthServiceAxiosPath.POST_LOGIN);
      const users = response.data;
      console.log("response from server: ", response.data);
      const authenticatedUser = users.find((user:any) => user.name === username && user.password === password);
      console.log("response from auth: ", authenticatedUser);

      if (authenticatedUser) {
        return authenticatedUser;
        
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new AuthServiceError('Authentication failed asd');
    }
  }
  logout(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isAuthenticated(token: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async register(user: UsersModel): Promise<UsersModel> {
    try {
      if (user.permission ! == 'super_user') {
        throw new Error('only super_user can perform this action.');
      }
      const response = await this.axios.post(AuthServiceAxiosPath.POST_REGISTER, user);
      const newUser = response.data;
      return newUser;
    } catch (error) {
      throw new AuthServiceError(AuthServiceAxiosPath.POST_REGISTER);
    }
  }
  changePassword(username: string, newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

class AuthServiceError extends Error{
  constructor(message: string){
    super(message);
    this.name = "AuthServiceError";
  }
}