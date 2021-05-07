import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { HallFeature } from "src/entities/hall-feature.entity";
import { HallFeatureService } from "src/services/hallFeature/hallFeature.service";


@Controller('api/hallfeature')
@Crud({
  model: {
    type: HallFeature
  }

})
    
  
export class HallFeatureController {
  constructor(
     public servise: HallFeatureService 
  ){ }
}