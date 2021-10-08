import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Feature } from 'src/entities/feature.entity';
import { HallFeature } from 'src/entities/hall-feature.entity';
import { Hall } from 'src/entities/hall.entity';
import { RoomFeature } from 'src/entities/room-feature.entity';
import { Room } from 'src/entities/room.entity';
import { UserHall } from 'src/entities/user-hall.entity';
import { UserRoom } from 'src/entities/user-room.entity';
import { User } from '../entities/user.entity';
import { AppController } from '../app.controller';
import { UserService } from '../services/user/user.service';
import { RoomController } from './api/room.controller';
import { RoomService } from 'src/services/room/room.service';
import { HallController } from './api/hall.controller';
import { HallService } from 'src/services/hall/hall.service';
import { FeatureController } from './api/feature.controller';
import { FeatureService } from 'src/services/feature/feature.service';
import { HallFeatureService } from 'src/services/hall/hallFeature.service';
import { HallFeatureController } from './api/hallFeature.controller';
import { Photo } from 'src/entities/photo.entity';
import { PhotoService } from 'src/services/photo/photo.service';
import { PhotoRoom } from 'src/entities/photo-room.entity';
import { PhotoHall } from 'src/entities/photo-hall.entity';
import { PhotoHallService } from 'src/services/photo/photoHall.service';
import { PhotoRoomService } from 'src/services/photo/photoRoom.service';
import { PhotoController } from './api/photo.controller';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from 'src/services/administrator/administrator.service';
import { AdministratorController } from 'src/controllers/api/administrator.controller';
import { AuthController } from './api/auth.controller';
import { AuthMiddleware } from 'src/middlewars/auth.Middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Administrator,
        Feature,
        HallFeature,
        Hall,
        RoomFeature,
        Room,
        UserHall,
        UserRoom,
        User,
        Photo,
        PhotoHall,
        PhotoRoom,]
    }),
      TypeOrmModule.forFeature([
        Administrator,
        User,
        Room,
        Hall,
        Feature,
        HallFeature,
        Photo,
        PhotoHall,
        PhotoRoom,

    ])

  ],
  controllers: [
    AdministratorController,
    AppController,
    RoomController,
    HallController,
    FeatureController,
    HallFeatureController,
    PhotoController,
    AuthController,
  ],
  providers: [
    AdministratorService,
    UserService,
    RoomService,
    HallService,
    FeatureService,
    HallFeatureService,
    PhotoService,
    PhotoRoomService,
    PhotoHallService,
    ],

  exports: [
    AdministratorService,
    UserService,
        
  ],
}) 
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude('auth/*')
      .forRoutes('api/*');
  }
}
