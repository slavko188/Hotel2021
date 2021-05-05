import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Hall } from "entities/hall.entity";

@Injectable()
export class HallService extends TypeOrmCrudService<Hall> {
  constructor(
        @InjectRepository(Hall) private readonly hall: Repository<Hall>                
  ) {
    super(hall);
  }
  

}