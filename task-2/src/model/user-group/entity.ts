import { Group } from "@model/group";
import { User } from "@model/user/entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Group, { onDelete: "CASCADE" })
  @JoinColumn()
  group: Group;
}