import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "entities/room.entity";
import { ApiResponseVjezbanje } from "src/Greska/Greske za vjezbanje/api.response.vjezbanje";
import { Repository } from "typeorm";

@Injectable()
export class RoomService {
  [x: string]: any;
  constructor(
     @InjectRepository(Room) 
    private  room: Repository<Room>
    
  ) { }
   
  getAll(): Promise<Room[]> {
    return this.room.find();
  }
   
  getById(id: number): Promise<Room | ApiResponseVjezbanje>{
    return new Promise((resolve) => {
      this.room.findOne(id)
        .then(data => resolve(data))
        .catch(error => {
          const response: ApiResponseVjezbanje = new ApiResponseVjezbanje('error', -1002);
          resolve(response);
        });
    })
    

    

  }
}