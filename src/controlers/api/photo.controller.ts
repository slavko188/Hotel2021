import { Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { Photo } from "src/entities/photo.entity";
import { PhotoService } from "src/services/photo/photo.service";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { ApiResponse } from "src/greska/api.response.class";


@Controller('api/photo')
  @Crud({
    model: {
     type: Photo
    },
    params: {
      id: {
        field: "photoId",
        type: "number",
        primary: true
      }

    }
  
   
  })
  
export class PhotoController {

  constructor(public photoService: PhotoService) { }

  @Post(':id/uploadphoto/')  // POST http://localhost:3000/api/article/:id/uploadPhoto
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: StorageConfig.photosDestination,
        filename: (req, file, callback) => {
             // Neka slika.jpeg
            //20200420-9785300766-Neka slika.jpg
          
          let original: string = file.originalname;

          let normalized = original.replace(/\s+/g, '-');
          normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
          let sada = new Date();
          let datePart = '';
          datePart += sada.getFullYear().toString();
          datePart += (sada.getMonth() + 1).toString();
          datePart += sada.getDate().toString();

          
          let randomPart: string = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString())
            .join('');
          
          let fileName = datePart + '-' + randomPart + '-' + normalized;

          fileName = fileName.toLocaleLowerCase();

          callback(null, fileName);

        }
      }),

      fileFilter: (req, file, callback) => {
         //provjera: Check ekstenzije: JPG,PNG

        if (!file.originalname.match(/\.(jpg|png)$/)) {
          
          callback(new Error('losa ekstenzija!'), false);
          return;
        }

          // Provjera: check tipa sadrzaja: image/jpeg,image/png/(mimetype)
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
    async uploadPhoto(@Param('id') photoId: number, @UploadedFile() photo): Promise<ApiResponse | Photo> {
    const newPhoto: Photo = new Photo();
    newPhoto.photoId = photoId;
    newPhoto.imagePath = photo.filename;

    const savedPhoto = await this.photoService.add(newPhoto);
    if (!savedPhoto) {
      return new ApiResponse('error', -4001);
     }
    return savedPhoto;

  }
}