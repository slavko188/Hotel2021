import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FeatureService } from "src/services/feature/feature.service";
import { Feature } from "src/entities/feature.entity";

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

    }
  
   
  })
  
export class FeatureController {

  constructor(public service: FeatureService) { }

}