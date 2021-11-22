import { Body, Controller, Get, Param,  Put, UseGuards } from "@nestjs/common";
import { Room } from "src/entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { RoomService } from "src/services/room/room.service";
import { PhotoService } from "src/services/photo/photo.service";
import { AllowToRoles } from "src/misc/alow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
import { Crud } from "@nestjsx/crud";


@Controller('api/room')
@Crud({
  model: {
     type: Room
  },
  params: {
    id: {
      field: 'roomId',
      type: 'number',
      primary: true
      }
  },
  
  routes: {
    only: [
      "createOneBase",
      "createManyBase",
      "getManyBase",
      "getOneBase",
      "updateOneBase",
    ],
    createOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },

    updateOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator'),
      ],
    },

    getManyBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator', 'user'),
      ],
    },
    
    getOneBase: {
      decorators: [
        UseGuards(RoleCheckedGuard),
        AllowToRoles('administrator', 'user'),
      ],
    },

  
  },
 })
export class RoomController {

  constructor(private roomService: RoomService, public photoService: PhotoService, ) { }
    

  @Get()
  @UseGuards(RoleCheckedGuard)
  @AllowToRoles('administrator', 'user')
  getAllRoom(): Promise<Room[]> {
    return this.roomService.getAll()
  }

  @Get(':id')
  @UseGuards(RoleCheckedGuard)
  @AllowToRoles('administrator', 'user')
  getByid(@Param('id') roomid:number): Promise<Room | ApiResponse> {
    return new Promise(async(resolve) => {
     let room = await this.roomService.getById(roomid)
     
      if (room === undefined) {
        resolve(new ApiResponse('error', -1002))
      }
      resolve(room);
    }); 

   }
  @Put()
  @UseGuards(RoleCheckedGuard)
  @AllowToRoles('administrator')  
  createFullRoom(@Body() data: AddRoomDto): Promise<Room | ApiResponse > {
    return this.roomService.createFullRoom(data);

     }
                                    
}

