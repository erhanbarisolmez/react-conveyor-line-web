import type ProductionModel from "../models/ProductionModel";

export default interface IProductionServices{
  getAll(): Promise<ProductionModel[]>;
  getById(id:number):Promise<ProductionModel[] | undefined>;
  create(production: ProductionModel): Promise<ProductionModel>;
  update(production: ProductionModel): Promise<ProductionModel>;
  delete(id:number): Promise<void>;
}