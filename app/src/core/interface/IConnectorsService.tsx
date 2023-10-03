import type ConnectorsModel from "../models/ConnectorsModel";

export interface IConnectorsService {
   getAll(): Promise<ConnectorsModel[]>;
   getById(id: number): Promise<ConnectorsModel[] | undefined>;
   create(connector: ConnectorsModel): Promise<ConnectorsModel>;
   update(connector: ConnectorsModel): Promise<ConnectorsModel>;
   delete(id: number): Promise<void>;
}