import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "src/entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class RoomService extends TypeOrmCrudService<Room>{
  constructor(
    @InjectRepository(Room)
        private readonly room: Repository<Room>  
  ) {
    super(room);
  }

   
    getAll(): Promise<Room[]> {
    return this.room.find();
  }

  getById(id: number): Promise<Room | ApiResponse> {
    return new Promise((resolve) => {
      this.room.findOne(id)
        .then(data => resolve(data))
        .catch(error => {
          const response: ApiResponse = new ApiResponse('error', -1002);
          resolve(response);
        })
    });
  }
  async createFullRoom(data: AddRoomDto): Promise<Room | ApiResponse> {
    let newRoom: Room   = new Room();
    newRoom.numberRoom  = data.numberRoom;
    newRoom.numberOfBed = data.numberOfBed;
    newRoom.floor       = data.floor;
    newRoom.typeOfBed   = data.typeOfBed;
    
    let savedRoom = await this.room.save(newRoom);
    
    return this.room.save(savedRoom);
  }       
   
 }

  
   
    