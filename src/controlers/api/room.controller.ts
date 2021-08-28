import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Room } from "src/entities/room.entity";
import { AddRoomDto } from "src/dtos/room/add.room.dto";
import { ApiResponse } from "src/greska/api.response.class";
import { ApiResponseVjezbanje } from "src/greska/greska za vjezbanje/api.response.vjezbanje";
import { RoomService } from "src/services/room/room.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfig } from "config/storage.config";
import { diskStorage } from "multer";
import { DatabaseConfiguration } from "config/database.configuration";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/entities/photo.entity";



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
   
  
  @Post(':id/uploadPhoto/') // POST http://localhost:3000/api/room/:id/uploadPhoto/
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: StorageConfig.photosDestination,
        filename: (req, file, callback) => {
              // 'Neka slika.jpg' ->
              // '20200420-9784536788-Neka-slika.jpg '
          
          let original: string = file.originalname;

          let normalized = original.replace(/\s+/g, '-');
          let sada = new Date();
          let datePart = '';
          datePart += sada.getFullYear().toString();
          datePart += (sada.getMonth() + 1).toString();
          datePart += sada.getDate().toString();
          
          
          let randomPart: string = new Array(10)
            .fill(0).map(e => (Math.random() * 9).toString()).join('');
          
          let fileName = datePart + '-' + randomPart + '-' + normalized;

          callback(null, fileName);

        } 
      }),
      fileFilter: (req, file, callback) => {
        if (file.originalname.match(/\.(jpg|png)$/)) {
          callback(new Error('Bad file extensions!'), false);
          return;
        }

        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
          callback(new Error('Bad file content!'), false);
          return;
        }
        callback(null, true);
      },
      limits: {
        files: 1,
        fieldSize: StorageConfig.photoMaxFileSize,
       },
       })
    )
 async uploadPhoto(@Param('id') roomId: number, @UploadedFile() photo): Promise<ApiResponse | Photo> {
    const newPhoto: Photo = new Photo();
    newPhoto.roomId = roomId;
    newPhoto.imagePath = photo.filename;

    const savedPhoto = await this.photoService.add(newPhoto);
    if (!savedPhoto) {
      return new ApiResponse('error', -4001);
    }
    return savedPhoto;
  }
                               
}

