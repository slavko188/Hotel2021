import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { HallFeature } from "src/entities/hall-feature.entity";


@Injectable()
export class HallFeatureService extends TypeOrmCrudService<HallFeature> {
  constructor(
        @InjectRepository(HallFeature) private readonly hallFeature: Repository<HallFeature>                
  ) {
    super(hallFeature);
  }
  

}