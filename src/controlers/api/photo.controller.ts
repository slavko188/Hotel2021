import { Controller, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Crud } from "@nestjsx/crud";
import { Photo } from "src/entities/photo.entity";
import { PhotoService } from "src/services/photo/photo.service";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { ApiResponse } from "src/greska/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';


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

        if (!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
          req.fileFilterError = "Bad file extension";
          callback(null, false);
          return;
        }

          // Provjera: check tipa sadrzaja: image/jpeg,image/png/(mimetype)
        
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
          req.fileFilterError = "Bad file content";
          callback(null, false); // ova greska ce da se prikaze u konsoli(ali to nije pravo mjesto gde treba da se prikaze ggreska)
          return;       // ovo je za proces dibagovanja da vidimo da li proces prolazi.
        }
        
        callback(null, true);
      },

      limits: {
        files: 1,
        fileSize: StorageConfig.photoMaxFileSize,

      },
      
    })
  )
  async uploadPhoto(
    @Param('id') photoId: number,
    @UploadedFile() photo,
    @Req() req): Promise<ApiResponse | Photo> {
    if (req.fileFilterError) {
      return new ApiResponse('error', -4002, req.fileFilterError);
    }

    if (!photo) {
      return new ApiResponse('error', -4002, 'File not uploaded!');
    }

    
         //TODO: Real Mime Type check(obrada faila)
    const fileTypeResult = await fileType.fromFile(photo.path);
    if (!fileTypeResult) {
      //ako se fail ne pronadje treba ga obrisati da ne zauzima resurse.kasnije ce se napisati logika.
      fs.unlinkSync(photo.path);
      return new ApiResponse('error', -4002, 'Can  not detected file type!');
    }
    
    const realMimeType = fileTypeResult.mime;

    if (!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
      // obrisati fail ako mu exstenzije nijesu jpeg ili png
      fs.unlinkSync(photo.path); // hocemo Sync jer treba prvo fail da se obrise pa tek da posalje apiresponse,da nebi dosli do prekida.
      
      return new ApiResponse('error', -4002, 'bad file content type!');
    }

    await this.createThumb(photo);
    await this.createSmallImage(photo);

    const newPhoto: Photo = new Photo();
    newPhoto.photoId = photoId;
    newPhoto.imagePath = photo.filename;

    const savedPhoto = await this.photoService.add(newPhoto);
    if (!savedPhoto) {
      return new ApiResponse('error', -4001);
     }
    return savedPhoto;

  }

      
 
  async createThumb(photo) {
    const originalFilePath = photo.path;
    const fileName = photo.filename;

    const destinationFilePath = StorageConfig.photosDestination + "thumb/" + fileName;
     
    await sharp(originalFilePath)
      .resize({
        fit: 'cover',
        width: StorageConfig.photoThumbSize.width,
        height: StorageConfig.photoThumbSize.height,
        background: {
          r: 255, g: 255, b: 255, alpha: 0.0 
        }
      })   
      .toFile(destinationFilePath);
  }

  async createSmallImage(photo) {
    const originalFilePath = photo.path;
    const fileName = photo.filename;

    const destinationFilePath = StorageConfig.photosDestination + "small/" + fileName;
     
    await sharp(originalFilePath)
      .resize({
        fit: 'cover',
        width: StorageConfig.photoSmallSize.width,
        height: StorageConfig.photoSmallSize.height,
        background: {
          r: 255, g: 255, b: 255, alpha: 0.0
        }
      })   
      .toFile(destinationFilePath);
  }


}
