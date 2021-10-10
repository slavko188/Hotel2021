import { Body, Controller, Get, Param, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.descriptor";
import { ApiResponse } from "src/misc/api.response.class";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller('api/administrator')
export class AdministratorController {
  constructor(private administratorService: AdministratorService) { }
  
  @Get()
  @UseGuards(RoleCheckedGuard)  
  @AllowToRoles('administrator')
  getAll(): Promise<Administrator[]>{
    return this.administratorService.getAll();
  }
  @Get(':id')
  @UseGuards(RoleCheckedGuard)
  @AllowToRoles('administrator')
  getById(@Param('id') administratorId: number): Promise<Administrator | ApiResponse>{
    return new Promise(async(resolve) => {
      let admin = await this.administratorService.getById(administratorId);
      
      if (admin === undefined) {
        resolve(new ApiResponse("error", -1003, "Non exsisting administrator"));
      }
      resolve(admin);
      });
    
  }
 // Put http://localhost:3000/api/administrator/
  @Put()
  @UseGuards(RoleCheckedGuard)
  @AllowToRoles('administrator')
   add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
    return this.administratorService.add(data);
  }

  //  POST http://localhost:3000/api/administrator/4/ -> da se promijeni password administratoru br.4
  @Post(':id')
  @UseGuards(RoleCheckedGuard) 
  @AllowToRoles('administrator')
  edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
    return this.administratorService.editById(id, data);
  }



}