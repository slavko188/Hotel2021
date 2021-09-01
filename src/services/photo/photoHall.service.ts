import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PhotoHall } from "src/entities/photo-hall.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhotoHallService extends TypeOrmCrudService<PhotoHall> {
  constructor(
        @InjectRepository(PhotoHall) private readonly photoHall: Repository<PhotoHall>                
  ) {
    super(photoHall);
  }
  

}