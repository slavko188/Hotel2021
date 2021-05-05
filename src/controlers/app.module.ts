import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Feature } from 'entities/feature.entity';
import { HallFeature } from 'entities/hall-feature.entity';
import { Hall } from 'entities/hall.entity';
import { RoomFeature } from 'entities/room-feature.entity';
import { Room } from 'entities/room.entity';
import { UserHall } from 'entities/user-hall.entity';
import { UserRoom } from 'entities/user-room.entity';
import { User } from '../../entities/user.entity';
import { AppController } from '../app.controller';
import { UserService } from '../services/user/user.service';
import { UserController } from './api/user.controller';
import { RoomController } from './api/room.controller';
import { RoomService } from 'src/services/Room/room.service';
import { HallController } from './api/hall.controller';
import { HallService } from 'src/services/hall/hall.service';

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
        User,]
    }),
    TypeOrmModule.forFeature([
      User,
      Room,
      Hall
    ])

  ],
  controllers: [
    AppController,
    UserController,
    RoomController,
    HallController,
  ],
  providers: [
    UserService,
    RoomService,
    HallService,
    ],
})
export class AppModule {}
