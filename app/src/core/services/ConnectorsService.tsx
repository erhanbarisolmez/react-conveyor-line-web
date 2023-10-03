import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { IConnectorsService } from '../interface/IConnectorsService';
import type ConnectorsModel from '../models/ConnectorsModel';

export enum ConnectorsServiceAxiosPath {
  BASE_URL ='http://localhost:3001/connectors',
  GET_ALL='/getAllConnectors',
  POST_BY_ID='/getConnectorsById/:_id',
  CREATE ='/createConnectors',
  UPDATE ='/updateConnectors/:id ',
  DELETE='/deleteConnectors/'
}
export enum ConnectorsServiceErrorPath {
  GET_All_ERROR = '/error-connectors/:all',
  GET_ById_ERROR ='/error-connectors/:_id',
  GET_Create_ERROR = '/error-connectors/create',
  GET_Update_ERROR = '/error-connectors/update',
  GET_Delete_ERROR = '/error-connectors/delete/:id'
}

export class ConnectorsService implements IConnectorsService {
  private axios!: AxiosInstance;
  private connectors: ConnectorsModel[] = [];
  
  constructor() {
    this.loadConnector();
  }
  private async loadConnector(): Promise<void> {
    this.axios = axios.create({
      baseURL: ConnectorsServiceAxiosPath.BASE_URL,
    });
  }
  async getAll(): Promise<ConnectorsModel[]> {
    try {
         const response = await this.axios.get(`${ConnectorsServiceAxiosPath.GET_ALL}`);
        this.connectors= response.data;
        return this.connectors;
    } catch (error) {
      throw new ConnectorsServiceError(ConnectorsServiceErrorPath.GET_All_ERROR);
    }
  }

  async getById(id: number): Promise<ConnectorsModel[] | undefined> {
    try {
      const response = await this.axios.get(`${ConnectorsServiceAxiosPath.POST_BY_ID}${id}`);
      this.connectors = response.data;
      return this.connectors;
    } catch (error) {
      throw new  ConnectorsServiceError(ConnectorsServiceErrorPath.GET_ById_ERROR);
    }
  }

  async create(connector: ConnectorsModel): Promise<ConnectorsModel> {
    this.connectors.push(connector);
    return connector;
  }

  async update(connector: ConnectorsModel): Promise<ConnectorsModel> {
    const index = this.connectors.findIndex((c) => c.id === connector.id);
    this.connectors[index] = connector;
    return connector;
  }

  async delete(id: number): Promise<void> {
    
    try {
      await this.axios.delete(`${ConnectorsServiceAxiosPath.DELETE}${id}`);
    } catch (error) {
      throw new ConnectorsServiceError(ConnectorsServiceErrorPath.GET_Delete_ERROR);
    }
    
  }

}

class ConnectorsServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConnectorsServiceError';
  }
}
