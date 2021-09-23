import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HallFeature } from "./hall-feature.entity";
import { PhotoHall } from "./photo-hall.entity";
import { UserHall } from "./user-hall.entity";
import * as Validator from 'class-validator';

@Index("name", ["name"], { unique: true })
@Entity("hall")
export class Hall {
  @PrimaryGeneratedColumn({ type: "int", name: "hall_id", unsigned: true })
  hallId: number;

  @Column({
    type:"varchar",
    name: "name",
    unique: true,
    length: 128,
    
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(0, 123)
  name: string;

  @Column({
    type:"decimal", 
    name: "surface",
    unsigned: true,
    precision: 10,
    scale: 2,
    
  })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
     surface: number;

  @Column({
    type:"smallint",
    name: "number_place",
    unsigned: true,
   
  })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  numberPlace: number;

  @OneToMany(() => HallFeature, (hallFeature) => hallFeature.hall)
  hallFeatures: HallFeature[];
  
 

  @OneToOne(() => UserHall, (userHall) => userHall.hall)
  userHall: UserHall;

  @OneToMany(() => PhotoHall, (photoHall) => photoHall.hall)
  photoHall: PhotoHall;

  
}
