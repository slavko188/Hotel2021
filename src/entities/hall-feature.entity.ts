import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Feature } from "./feature.entity";
import { Hall } from "./hall.entity";

@Index("uq_hall_feature_hall_id_feature_id", ["hallId", "featureId"], {
  unique: true,
})
@Index("fk_hall_feature_feature_id", ["featureId"], {})
@Entity("hall_feature")
export class HallFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "hall_feature", unsigned: true })
  hallFeatureId: number;

  @Column({ name: "hall_id", type:"int", unsigned: true })
  hallId: number;

  @Column({ name: "feature_id",type:"int", unsigned: true })
  featureId: number;

  @ManyToOne(() => Feature, (feature) => feature.hallFeatures, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }])
  feature: Feature;

  @ManyToOne(() => Hall, (hall) => hall.hallFeatures, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;
}
