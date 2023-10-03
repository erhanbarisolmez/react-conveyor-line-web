import type CodesModel from "~/src/core/models/CodesModel";

export interface ICodesService {

   getAll(): Promise<CodesModel[]>;
   getById(id: number): Promise<CodesModel[] | undefined>;
   create(code: CodesModel): Promise<CodesModel>;
   update(code: CodesModel): Promise<CodesModel>;
   delete(id: number): Promise<void>;
}