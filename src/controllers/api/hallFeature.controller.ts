import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { HallFeature } from "src/entities/hall-feature.entity";
import { HallFeatureService } from "src/services/hall/hallFeature.service";

@Controller('api/hallfeature')
  @Crud({
    model: {
     type: HallFeature
    },
    params: {
      id: {
        field: "featureId, hallId",
        type: "number",
        primary: true
      }

    }
  
   
  })
  
export class HallFeatureController {

  constructor(public service: HallFeatureService) { }

}