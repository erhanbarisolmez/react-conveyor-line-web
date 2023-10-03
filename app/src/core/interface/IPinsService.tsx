import type PinsModel from "../models/PinsModel";

export default interface IPinsService{
  getAll(): Promise<PinsModel[]>;
  getById(id: number): Promise<PinsModel[] | undefined>;
  create(pin: PinsModel): Promise<PinsModel>;
  update(pin: PinsModel): Promise<PinsModel>;
  delete(id: number): Promise<void>;
}