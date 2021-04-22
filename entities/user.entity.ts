import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'int', unsigned: true})
  userId: number;

  @Column({name:'is_active', type: 'tinyint', unsigned: true})
  isActive: string;

  @Column({type: 'varchar', length: '60', unique: true})
  username: string;
  
  @Column({ type: 'varchar', length: '64'})
  forename: string;

  @Column({ type: 'varchar', length: '64'})
  surname: string;

  @Column({ name: 'password_hash', type: 'varchar', length: '128'})
  passwordHash: string;

}