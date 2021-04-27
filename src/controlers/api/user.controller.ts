import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "entities/user.entity";
import { AddUserDto } from "src/dtos/user/add.user.dto";
import { EditUserDto } from "src/dtos/user/edit.user.dto";
import { UserService } from "src/services/user/user.service";

@Controller('api/user')
export class UserController {
  constructor(
       private userService: UserService
  ) { }
  
  @Get()
  getAll(): Promise<User[]> {
      return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') userId: number): Promise<User> {
      return this.userService.getById(userId);
  }
    //Put http://localhost/3000/api/user/
  @Put()
  add( @Body() data: AddUserDto): Promise<User> {
    return this.userService.add(data);
  }

  // POST http://localhost:3000/api/user/3/hocu da promenim sa userom 3.

  @Post(':id')
  edit(@Param('id') id: number, @Body() data: EditUserDto): Promise<User> {
    return this.userService.editById(id, data);
  }

}