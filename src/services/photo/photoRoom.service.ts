import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PhotoRoom } from "src/entities/photo-room.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhotoRoomService extends TypeOrmCrudService<PhotoRoom> {
  constructor(
        @InjectRepository(PhotoRoom) private readonly photoRoom: Repository<PhotoRoom>                
  ) {
    super(photoRoom);
  }
  

}