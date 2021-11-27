import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "src/entities/room.entity";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/misc/api.response.class";


@Injectable()
export class RoomService extends TypeOrmCrudService<Room>{
  constructor(
    @InjectRepository(Room)
        private readonly room: Repository<Room>,
   
  ) {
    super(room);
  }
  add(data: AddRoomDto): Promise<Room | ApiResponse> {
    console.log(data);
    let newRoom: Room = new Room();
    newRoom.numberRoom = data.numberRoom;
    newRoom.numberOfBed = data.numberOfBed;
    newRoom.typeOfBed = data.typeOfBed;
    newRoom.floor = data.floor;


    return new Promise((resolve) => {
      this.room.save(newRoom)
        .then(data => resolve(data))
              const response: ApiResponse = new ApiResponse("error", -5001, 'Greska u dodavanju sobe');
          resolve(response);
        });
   

  }
         
 }

  
   
    