import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Feature } from "./feature.entity";
import { Room } from "./room.entity";

@Index("uq_room_feature_room_id_feature_id", ["roomId", "featureId"], {
  unique: true,
})
@Index("feature_id", ["featureId"], {})
@Entity("room_feature")
export class RoomFeature {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "room_feature_id",
    unsigned: true,
  })
  roomFeatureId: number;

  @Column({ name: "room_id",type:"int", unsigned: true })
  roomId: number;

  @Column({ name: "feature_id",type:"int",  unsigned: true })
  featureId: number;

  @ManyToOne(() => Feature, (feature) => feature.roomFeatures, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }])
  feature: Feature;

  @ManyToOne(() => Room, (room) => room.roomFeatures, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;
}
