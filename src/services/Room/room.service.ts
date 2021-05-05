import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/greska/api.response.class";
import { ApiResponseVjezbanje } from "src/greska/greska za vjezbanje/api.response.vjezbanje";
import { Repository } from "typeorm";

@Injectable()
export class RoomService {
  findOne(roomId: number) {
    throw new Error("Method not implemented.");
  }
 
  constructor(
    @InjectRepository(Room)
        private  room: Repository <Room>  
   ) { }  
   
  getAll(): Promise<Room[]> {
    return this.room.find();
  }

  getById(id: number): Promise<Room | ApiResponseVjezbanje> {
    return new Promise((resolve) => {
      this.room.findOne(id)
        .then(data => resolve(data))
        .catch(error => {
          const response: ApiResponseVjezbanje = new ApiResponseVjezbanje('error', -1002);
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

  
   
    