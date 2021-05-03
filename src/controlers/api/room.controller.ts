import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { Room } from "entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/Greska/api.response.class";
import { ApiResponseVjezbanje } from "src/Greska/Greske za vjezbanje/api.response.vjezbanje";
import { RoomService } from "src/services/Room/room.service";


@Controller('api/room')
export class RoomController {

  constructor(private roomService: RoomService) { }
    
  @Get()
  getAllRoom(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Get(':id')
  getByid(@Param('id') roomid:number): Promise<Room | ApiResponseVjezbanje> {
    return new Promise(async(resolve) => {
     let room = await this.roomService.getById(roomid)
     
      if (room === undefined) {
        resolve(new ApiResponseVjezbanje('error', -1002))
      }
      resolve(room);
    }); 

    
  }
  
  @Put() 
  createFullRoom(@Body() data: AddRoomDto): Promise<Room | ApiResponse > {
    return this.roomService.createFullRoom(data);

     }
   
  
}
