import { Body, Controller, Get, Param,  Put } from "@nestjs/common";
import { Room } from "src/entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/greska/api.response.class";
import { ApiResponseVjezbanje } from "src/greska/greska za vjezbanje/api.response.vjezbanje";
import { RoomService } from "src/services/room/room.service";
import { PhotoService } from "src/services/photo/photo.service";


@Controller('api/room')
export class RoomController {

  constructor(private roomService: RoomService, public photoService: PhotoService, ) { }
    
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

