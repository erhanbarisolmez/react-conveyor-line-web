import CSVService from '~/src/core/services/CSVService';
import { CodesService } from '~/src/core/services/CodesService'; // Örnek servislerinizi içe aktarın
import { DeleteAllService } from '~/src/core/services/DeleteAllService';
import PDFService from '~/src/core/services/PDFService';
import { AuthService } from './AuthService';
import { ConnectorsService } from './ConnectorsService';
import PinsService from './PinsService';
import ProductionService from './ProductionService';
import UsersService from './UsersService';
import VariablesLengthService from './VariablesLengthService';

class ServiceManager {
  
  codesService = new CodesService();
  connectorsService = new ConnectorsService();
  variablesLengthService = new VariablesLengthService();
  pinsService = new PinsService();
  productionService = new ProductionService();
  usersService = new UsersService();
  csvGenerateService = new CSVService();
  pdfGenerateService = new PDFService();
  deleteAllGenerateService = new DeleteAllService();
  authService = new AuthService();

  getCodesService() {
    return this.codesService;
  }
  getConnectorsService(){
    return this.connectorsService;
  }
  getVariablesLengthService(){
    return this.variablesLengthService;
  }
  getPinsService(){
    return this.pinsService;
  }
  getProductionService(){
    return this.productionService;
  }
  getUsersService(){
    return this.usersService;
  }
  getCSVGenerateService(){
    return this.csvGenerateService;
  }
  getPDFGenerateService(){
    return this.pdfGenerateService;
  }
  getDeleteAllGenerateService(apiUrl : string){
    return this.deleteAllGenerateService;
  }

  getAuthService(){
    return this.authService
  }
}

export default new ServiceManager();
