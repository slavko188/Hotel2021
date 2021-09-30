import {  Controller } from "@nestjs/common";
import { UserService } from "src/services/user/user.service";

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService){}
  }
  


