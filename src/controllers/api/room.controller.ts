import {  Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { Room } from "src/entities/room.entity";
import { RoomService } from "src/services/room/room.service";
import { PhotoService } from "src/services/photo/photo.service";
import { AllowToRoles } from "src/misc/alow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
import { Crud } from "@nestjsx/crud";
import { ApiResponse } from "src/misc/api.response.class";
import { AddRoomDto } from "src/dtos/room/add.room.dto";


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

  query: {
    join: {

      roomFeatures: {
        eager: true
      },
      photoRoom: {
        eager: false
      }
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

  constructor(
    private roomService: RoomService,
    private photoService: PhotoService, ) { }
   
    @Post('room')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
     add( @Body() data: AddRoomDto): Promise<Room | ApiResponse> {
      return this.roomService.add(data);
  
    }
}

