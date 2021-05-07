import { Feature } from "src/entities/feature.entity";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HallFeature } from "./hall-feature.entity";
import { UserHall } from "./user-hall.entity";

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
  name: string;

  @Column({
    type:"decimal", 
    name: "surface",
    unsigned: true,
    precision: 10,
    scale: 2,
    
  })
  surface: number;

  @Column({
    type:"smallint",
    name: "number_place",
    unsigned: true,
   
  })
  numberPlace: number;

  @OneToMany(() => HallFeature, (hallFeature) => hallFeature.hall)
  hallFeatures: HallFeature[];

  features: Feature[];

  @OneToOne(() => UserHall, (userHall) => userHall.hall)
  userHall: UserHall;
}
