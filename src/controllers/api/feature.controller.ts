import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FeatureService } from "src/services/feature/feature.service";
import { Feature } from "src/entities/feature.entity";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/alow.to.roles.descriptor";

@Controller('api/feature')
  @Crud({
    model: {
     type: Feature
    },
    params: {
      id: {
        field: "featureId",
        type: "number",
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
  
export class FeatureController {

  constructor(public service: FeatureService) { }

}