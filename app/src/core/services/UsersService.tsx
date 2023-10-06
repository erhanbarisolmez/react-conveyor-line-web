import type { AxiosInstance } from "axios";
import axios from "axios";
import type IUsersService from "../interface/IUsersService";
import type UsersModel from "../models/UsersModel";

export enum UserServiceAxiosPath{
  BASE_URL = 'http://localhost:3001/users',
  GET_ALL = '/getAllUsers',
  GET_BY_ID = '/getUserById/',
  CREATE = '/createUser',
  UPDATE = '/updateUser/',
  DELETE = '/deleteUser/'
}
export enum UserServiceErrorPath{
  GET_All_ERROR = '/error-users/:all',
  GET_ById_ERROR ='/error-user/:_id',
  GET_Create_ERROR = '/error-user/create',
  GET_Update_ERROR = '/error-user/update',
  GET_Delete_ERROR = '/error-user/delete/:id',
}
export default class UserService implements IUsersService{
  private axios!: AxiosInstance;
  private users: UsersModel[] = [];
  constructor(){ this.loadUsers();}
 
  private async loadUsers(): Promise<void>{
    this.axios = axios.create({ 
       baseURL: UserServiceAxiosPath.BASE_URL 
      });
  }
  async getAll(): Promise<UsersModel[]> {
    try {
      const response = await this.axios.get(`${UserServiceAxiosPath.GET_ALL}`);
      this.users = response.data;
      return this.users;
    } catch (error) {
      throw new UsersServiceError(UserServiceErrorPath.GET_All_ERROR);
    }
  }
  async getById(id: number): Promise<UsersModel[] | undefined> {
    try {
      const response = await this.axios.get(`${UserServiceAxiosPath.GET_BY_ID}${id}`);
      this.users = response.data;
      return this.users;
    } catch (error) {
      throw new UsersServiceError(UserServiceErrorPath.GET_ById_ERROR);
    }
  }
  async create(user: UsersModel): Promise<UsersModel> {
    this.users.push(user);
    return user;
  }
  async update(user: UsersModel): Promise<UsersModel> {
    const index = this.users.findIndex((c) => c.id === user.id);
    this.users[index] = user;
    return user;
  }
  async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${UserServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      
    }
  }
}

 class UsersServiceError extends Error{
  constructor(message: string){
    super(message);
    this.name = 'UsersServiceError';
  }
}