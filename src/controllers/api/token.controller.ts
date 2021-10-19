import {   Controller } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { UserService } from "src/services/user/user.service";


@Controller('token')
export class TokenController {
  constructor(
    private administratorService: AdministratorService,
    private userService: UserService,
  ) { }


  private getDatePlus(numberOfSeconds: number): number {
    return new Date().getTime() / 1000 + numberOfSeconds;
  }

  private getIsoDate(timestamp: number): string {
    const date = new Date();
    date.setTime(timestamp * 1000);
    return date.toISOString();
  }
}