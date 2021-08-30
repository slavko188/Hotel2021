import { Module } from '@nestjs/common';
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
import { UserController } from './api/user.controller';
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
    AppController,
    UserController,
    RoomController,
    HallController,
    FeatureController,
    HallFeatureController,
  ],
  providers: [
    UserService,
    RoomService,
    HallService,
    FeatureService,
    HallFeatureService,
    PhotoService,
    ],
}) 
export class AppModule {}
