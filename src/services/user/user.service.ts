import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { EditUserDto } from 'src/dtos/user/edit.user.dto';
import { ApiResponse } from 'src/greska/api.response.class';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
     private readonly user: Repository<User>,
  ) { }

  getAll(): Promise<User[]> {
    return this.user.find();
  }

  getById(id: number): Promise<User> {
     return this.user.findOne(id);
  }
  
  add(data: AddUserDto): Promise<User | ApiResponse> {
 
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toUpperCase();

    let newUser: User = new User();
    newUser.username = data.username;
    newUser.passwordHash = passwordHashString;

    return new Promise((resolve) => {
      this.user.save(newUser)
      .then(data => resolve(data))
      .catch(error => {
          const response: ApiResponse = new ApiResponse("error", -1000);
          resolve(response);
      });
      
    });

  }
  
   async editById(id: number, data: EditUserDto): Promise<User | ApiResponse> {
     let user: User = await this.user.findOne(id);

     if (user === undefined) {
       return new Promise((resolve) => {
         resolve(new ApiResponse("error", -1002));
       });
     }
     
 
     const passwordHash = crypto.createHash('sha512');
     passwordHash.update(data.password);
     const passwordHashString = passwordHash.digest('hex').toUpperCase();
     
     user.passwordHash = passwordHashString;
     return this.user.save(user);

      
  }
}
