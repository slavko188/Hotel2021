import { HallService } from "src/services/hall/hall.service";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HallFeature } from "./hall-feature.entity";
import { Hall } from "./hall.entity";
import { RoomFeature } from "./room-feature.entity";

@Index("name", ["name"], { unique: true })
@Entity("feature")
export class Feature {
  @PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
  featureId: number;

  @Column({
    type:"varchar",
    name: "name",
    unique: true,
    length: 50,
    
  })
  name: string;

  @OneToMany(() => HallFeature, (hallFeature) => hallFeature.feature)
  hallFeatures: HallFeature[];
  hall: Hall[];

  @OneToMany(() => RoomFeature, (roomFeature) => roomFeature.feature)
  roomFeatures: RoomFeature[];
}
