import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hall } from "./hall.entity";
import { User } from "./user.entity";


@Index("uq_user_hall_user_id", ["userId"], { unique: true })
@Index("uq_user_hall_hall_id", ["hallId"], { unique: true })
@Entity("user_hall")
export class UserHall {
  @PrimaryGeneratedColumn({ type: "int", name: "user_hall_id", unsigned: true })
  userHallId: number;

  @Column({
    type:"int",
    name: "user_id",
    unique: true,
    unsigned: true,
    
  })
  userId: number;

  @Column({
    type:"int",
    name: "hall_id",
    unique: true,
    unsigned: true,
   
  })
  hallId: number;

  @Column({type: "datetime",  name: "checks_in_at" })
  checksInAt: Date;

  @Column({ type:"datetime",  name: "checks_out_at" })
  checksOutAt: Date;

  @OneToOne(() => Hall, (hall) => hall.userHall, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

  @OneToOne(() => User, (user) => user.userHall, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
