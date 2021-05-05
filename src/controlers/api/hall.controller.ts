import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Hall } from "entities/hall.entity";
import { HallService } from "src/services/hall/hall.service";

@Controller('api/hall')
@Crud({
  model: {
     type: Hall
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
      }
   }
 }) 
export class HallController {
  constructor(public service: HallService) { }
}