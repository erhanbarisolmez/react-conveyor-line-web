import type { AxiosInstance } from "axios";
import axios from "axios";
import type IProductionServices from "../interface/IProductionService";
import type ProductionModel from "../models/ProductionModel";

export enum ProductionServiceAxiosPath{
  BASE_URL = 'http://localhost:3001/production',
  GET_ALL = '/getAllProduction',
  POST_BY_ID = '/getProduction/ById/',
  CREATE = '/create/', 
  UPDATE = '/update/',
  DELETE = '/deleteProduction/'
}

export enum ProductionServiceErrorPath{
  GET_All_ERROR = '/error-production/:all',
  GET_ById_ERROR = '/error-production/:id',
  GET_Create_ERROR = '/error-production/create',
  GET_Update_ERROR = '/error-production/update',
  GET_Delete_ERROR = '/error-production/delete/:id'
}

export default class ProductionService implements IProductionServices{
  private axios!: AxiosInstance;
  private productions : ProductionModel[] = [];

  constructor(){
    this.loadProduction();
  }
  
  private async loadProduction():Promise<void>{
    this.axios = axios.create({
      baseURL:ProductionServiceAxiosPath.BASE_URL
    });
  }
  async getAll(): Promise<ProductionModel[]> {
    try {
      const response = await this.axios.get(`${ProductionServiceAxiosPath.GET_ALL}`);
      this.productions = response.data;
      return this.productions;
    } catch (error) {
      throw new ProductionError(ProductionServiceErrorPath.GET_All_ERROR);
    }
  }
  async getById(id: number): Promise<ProductionModel[] | undefined> {
    try {
      const response = await this.axios.get(`${ProductionServiceAxiosPath.POST_BY_ID}${id}`);
      this.productions = response.data;
      return this.productions;
    } catch (error) {
      throw new ProductionError(ProductionServiceErrorPath.GET_ById_ERROR);
    }
  }
  async create(production: ProductionModel): Promise<ProductionModel> {
    this.productions.push(production);
    return production;
  }
  async update(production: ProductionModel): Promise<ProductionModel> {
    const index = this.productions.findIndex((c) => c.id === production.id);
    this.productions[index] = production;
    return production;
  }
  async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${ProductionServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      throw new ProductionError(ProductionServiceErrorPath.GET_Delete_ERROR);
    }
  }
  
}

class ProductionError extends Error{
  constructor(message: string){
    super(message);
    this.name="ProductionError";
  }
}