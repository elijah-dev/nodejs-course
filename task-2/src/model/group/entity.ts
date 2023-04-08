import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum UserPermissions {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  SHARE = "SHARE",
  UPLOAD_FILES = "UPLOAD_FILES",
}

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: "enum",
    enum: UserPermissions,
    array: true,
    nullable: false,
  })
  permissions: UserPermissions[];
}
