import type VariablesLengthModel from "../models/VariablesLengthModel";

export interface IVariablesLengthService{
  getAll(): Promise<VariablesLengthModel[]>;
  getById(id:number): Promise<VariablesLengthModel[] | undefined>;
  create(variable: VariablesLengthModel): Promise<VariablesLengthModel>;
  update(variable: VariablesLengthModel): Promise<VariablesLengthModel>;
  delete(id: number): Promise<void>;
}