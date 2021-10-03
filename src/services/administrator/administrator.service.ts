import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Administrator } from 'src/entities/administrator.entity';
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import * as crypto from "crypto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/greska/api.response.class";

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administrator: Repository<Administrator>
  ) { }
  
 async getAll(): Promise<Administrator[]> {
   const allAdmin = await this.administrator.find();

   if (allAdmin) {
     return allAdmin;
   }

   return null;
   

  }

  async getByUsername(username: string): Promise <Administrator | null> {
    const admin = await this.administrator.findOne({
      username: username
    });
    if (admin) {
      return admin;
    }
    return null;
  }
   
  getById(id: number): Promise<Administrator | ApiResponse> {
    return this.administrator.findOne(id);

  }
  add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    let newAdmin: Administrator = new Administrator();
    newAdmin.username = data.username;
    newAdmin.passwordHash = passwordHashString;

    return new Promise((resolve) => {
      this.administrator.save(newAdmin).then(data => resolve(data))
        .catch(error => {
          const response: ApiResponse = new ApiResponse("error", -1001);
          resolve(response);
        });
    });

  }

  async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse>{
    let admin: Administrator = await this.administrator.findOne(id);

    if (admin === undefined) {
      return new Promise((resolve) => {
           resolve (new ApiResponse("error", -1002))
      });
    }
    
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    admin.passwordHash = passwordHashString;
    return this.administrator.save(admin);
    
   }
}