import type { AxiosInstance } from "axios";
import axios from "axios";
import type IPinsService from "../interface/IPinsService";
import type PinsModel from "../models/PinsModel";

export enum PinsServiceAxiosPath{
  BASE_URL = 'http://localhost:3001/pins',
  GET_ALL = '/getAllPins',
  POST_BY_ID = '/getPinsById/',
  CREATE = '/create/', 
  UPDATE = '/update/',
  DELETE = '/deletePins/'
}

export enum PinsServiceErrorPath{
  GET_All_ERROR = '/error-pins/:all',
  GET_ById_ERROR = '/error-pins/:id',
  GET_Create_ERROR = '/error-pins/create',
  GET_Update_ERROR = '/error-pins/update',
  GET_Delete_ERROR = '/error-pins/delete/:id'
}
export default class PinsService implements IPinsService{
  private axios!: AxiosInstance;
  private pins: PinsModel[] = [];

  constructor(){
    this.loadPins();
  }
  private async loadPins(): Promise<void>{
    this.axios = axios.create({
      baseURL: PinsServiceAxiosPath.BASE_URL
    });
  }
  async getAll(): Promise<PinsModel[]> {
    try {
      const response = await this.axios.get(`${PinsServiceAxiosPath.GET_ALL}`);
      this.pins = response.data;
      return this.pins;
    } catch (error) {
      throw new PinsError(PinsServiceErrorPath.GET_All_ERROR);
    }
  }
  async getById(id: number): Promise<PinsModel[] | undefined> {
    try {
      const response = await this.axios.get(`${PinsServiceAxiosPath.POST_BY_ID}${id}`);
      this.pins = response.data;
      return this.pins;
    } catch (error) {
      throw new PinsError(PinsServiceErrorPath.GET_ById_ERROR);
    }
  }
  async create(pin: PinsModel): Promise<PinsModel> {
    this.pins.push(pin);
    return pin;
  }
  async update(pin: PinsModel): Promise<PinsModel> {
    const index = this.pins.findIndex((c) => c.id === pin.id);
    this.pins[index] = pin;
    return pin;  
  }

 async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${PinsServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      throw new PinsError(PinsServiceErrorPath.GET_Delete_ERROR);
    }
  }
  
}

class PinsError extends Error{
  constructor(message: string){
    super(message);
    this.name= "PinsError";
  }
}