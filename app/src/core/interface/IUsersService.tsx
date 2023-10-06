import type UsersModel from "../models/UsersModel";

export default interface IUsersService{
  getAll(): Promise<UsersModel[]>;
  getById(id: number): Promise<UsersModel[] | undefined>;
  create(user: UsersModel): Promise<UsersModel>;
  update(user: UsersModel): Promise<UsersModel>;
  delete(id: number): Promise<void>;
}