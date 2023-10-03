import type { AxiosInstance } from "axios";
import axios from "axios";
import type { IVariablesLengthService } from "../interface/IVariablesLengthService";
import type VariablesLengthModel from "../models/VariablesLengthModel";

export enum VariablesLengthServiceAxiosPath{
  BASE_URL = 'http://localhost:3001/variablesLength',
  GET_ALL = '/getAllVariablesLength',
  POST_BY_ID = '/getVariablesLengthById/',
  CREATE = '/createVariablesLength/',
  UPDATE = '/updateVariablesLength/',
  DELETE = '/deleteVariablesLength/'
}

export enum VariablesLengthServiceErrorPath{
  GET_All_ERROR = '/error-variables/:all',
  GET_ById_ERROR = '/error-variables/:_id',
  GET_Create_ERROR = '/error-variables/create',
  GET_Update_ERROR = '/error-variables/update',
  GET_Delete_ERROR = '/error-variables/delete/:id'
}

export default class VariablesLengthService implements IVariablesLengthService{
  private axios!: AxiosInstance;
  private variables: VariablesLengthModel[] = [];

  constructor(){
    this.loadVariablesLength();
  }
  private async loadVariablesLength(): Promise<void>{
    this.axios = axios.create({
       baseURL: VariablesLengthServiceAxiosPath.BASE_URL
    });
  }
  async getAll(): Promise<VariablesLengthModel[]> {
    try {
      const response = await this.axios.get(`${VariablesLengthServiceAxiosPath.GET_ALL}`);
      this.variables = response.data;
      return this.variables;
    } catch (error) {
      throw new  VariablesLengthError(VariablesLengthServiceErrorPath.GET_All_ERROR);
    }
  }
  async getById(id: number): Promise<VariablesLengthModel[] | undefined> {
    try {
      const response = await this.axios.get(`${VariablesLengthServiceAxiosPath.POST_BY_ID}${id}`);
      this.variables = response.data;
      return this.variables;
    } catch (error) {
      throw new  VariablesLengthError(VariablesLengthServiceErrorPath.GET_ById_ERROR);
    }
  }
  async create(variable: VariablesLengthModel): Promise<VariablesLengthModel> {
    this.variables.push(variable);
    return variable;
  }
  async update(variable: VariablesLengthModel): Promise<VariablesLengthModel> {
    const index = this.variables.findIndex((c) => c.id === variable.id);
    this.variables[index] = variable;
    return variable;  
  }
  async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${VariablesLengthServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      throw new VariablesLengthError(VariablesLengthServiceErrorPath.GET_Delete_ERROR);
    }
  }

}

 class VariablesLengthError extends Error{
  constructor(message: string){
  super(message);
  this.name = "VariablesLengthError";
}
}