import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Hall } from "src/entities/hall.entity";
import { HallService } from "src/services/hall/hall.service";

@Controller('api/hall')
@Crud({
  model: {
     type: Hall
  },
  params: {
    id: {
      field: 'hallId',
      type: 'number',
      primary: true
      }
   }
 }) 
export class HallController {
  constructor(public service: HallService) { }
}