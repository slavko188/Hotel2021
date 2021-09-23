import { Controller, Get } from "@nestjs/common";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller()
export class AdministratorController {
  constructor(private administratorService: AdministratorService) { }
  
  @Get('api/administrator')
  getAllAdmins(): Promise<Administrator[]>{
    return this.administratorService.getAll();
  }
}