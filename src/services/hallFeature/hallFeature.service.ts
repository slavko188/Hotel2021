import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { HallFeature } from "src/entities/hall-feature.entity";
import { Repository } from "typeorm";

@Injectable()
export class HallFeatureService extends TypeOrmCrudService<HallFeature> {
  constructor(@InjectRepository(HallFeature) private readonly hallfeature: Repository<HallFeature>) {
    super(hallfeature);
  }

}