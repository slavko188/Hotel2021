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
import { User } from '../entities/user.entity';
import { AppController } from './app.controller';
import { UserService } from './services/user/user.service';


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
    TypeOrmModule.forFeature([ User ])
  ],
  controllers: [AppController],
  providers: [ UserService],
})
export class AppModule {}
