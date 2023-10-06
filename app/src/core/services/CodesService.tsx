import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { ICodesService } from '~/src/core/interface/ICodesService';
import type CodesModel from '~/src/core/models/CodesModel';

export enum CodesServiceAxiosPath {
  BASE_URL ='http://localhost:3001/codes',
  GET_ALL='/getAllCodes',
  GET_BY_ID='/getCodeById/',
  CREATE ='/createCode',
  UPDATE ='/updateCode/',
  DELETE='/deleteCode/'
}
export enum CodesServiceErrorPath {
  GET_All_ERROR = '/error-codes/:all',
  GET_ById_ERROR ='/error-code/:_id',
  GET_Create_ERROR = '/error-code/create',
  GET_Update_ERROR = '/error-code/update',
  GET_Delete_ERROR = '/error-code/delete/:id',
}

export class CodesService implements ICodesService {
  private axios!: AxiosInstance;
  private codes: CodesModel[] = [];
  
  constructor() {
    this.loadCodes();
  }
  private async loadCodes(): Promise<void> {
    this.axios = axios.create({
      baseURL: CodesServiceAxiosPath.BASE_URL
    });
  }
  async getAll(): Promise<CodesModel[]> {
    try {
         const response = await this.axios.get(`${CodesServiceAxiosPath.GET_ALL}`);
        this.codes= response.data;
        return this.codes;
    } catch (error) {
      throw new CodesServiceError(CodesServiceErrorPath.GET_All_ERROR);
    }
    
  }

  async getById(id: number): Promise<CodesModel[] | undefined> {
    try {
      const response = await this.axios.get(`${CodesServiceAxiosPath.GET_BY_ID}${id}`);
      this.codes = response.data;
      return this.codes;
    } catch (error) {
      throw new  CodesServiceError(CodesServiceErrorPath.GET_ById_ERROR);
    }
  }

  async create(code: CodesModel): Promise<CodesModel> {
    this.codes.push(code);
    return code;
  }

  async update(code: CodesModel): Promise<CodesModel> {
    const index = this.codes.findIndex((c) => c.id === code.id);
    this.codes[index] = code;
    return code;
  }

  async delete(id: number): Promise<void> {
    
    try {
      await this.axios.delete(`${CodesServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      throw new CodesServiceError(CodesServiceErrorPath.GET_Delete_ERROR);
    }
    
  }

}

class CodesServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CodesServiceError';
  }
}
