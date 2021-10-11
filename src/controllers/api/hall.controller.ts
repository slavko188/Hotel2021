import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Hall } from "src/entities/hall.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
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
  },
  
  routes: {
    only: [
      "createOneBase",
      "createManyBase",
      "getManyBase",
      "getOneBase",
      "updateOneBase",
    ],
    createOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },

    updateOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },

    getManyBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator', 'user'),
      ],
    },
    
    getOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator', 'user'),
      ],
    },

  
  },
 }) 
export class HallController {
  constructor(public service: HallService) { }
}