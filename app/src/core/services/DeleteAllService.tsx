import axios from "axios";
import DeleteAllServiceBase from "../abstract/DeleteAllService";

export class DeleteAllService<T> extends DeleteAllServiceBase<T>{

 async deleteAll(data:T[], apiUrl?:string):Promise<void>{
  if (!apiUrl) {
    throw new Error('API URL belirtilmedi.');
  }
  try {
    await axios.put(apiUrl,{
      data:data,
    });
  } catch (error) {
    throw new Error("Silme işlemi başarısız oldu: " + Error);
  }
 }
}
