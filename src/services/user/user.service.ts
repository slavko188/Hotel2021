import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { AddUserDto } from 'src/dtos/user/add.user.dto';
import { EditUserDto } from 'src/dtos/user/edit.user.dto';
import { Repository } from 'typeorm';


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
  
  add(data: AddUserDto): Promise<User> {
    const crypto = require('crypto');
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').topUpperCase();

    let newUser: User = new User();
    newUser.username = data.username;
    newUser.passwordHash = passwordHashString;

    return this.user.save(newUser);
  }
  
   async editById(id: number, data: EditUserDto): Promise<User> {
     let user: User = await this.user.findOne(id);
     
     const crypto = require('crypto');
     const passwordHash = crypto.createHash('sha512');
     passwordHash.update(data.password);
     const passwordHashString = passwordHash.digest('hex').topUpperCase();
     
     user.passwordHash = passwordHashString;
     return this.user.save(user);

      
  }
}
