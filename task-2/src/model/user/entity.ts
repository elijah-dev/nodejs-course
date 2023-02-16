import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";
import { IsStrongPassword, IsEmail, IsInt, Min, Max } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsEmail()
  login: string;

  @Column({
    nullable: false,
  })
  @IsStrongPassword()
  password: string;

  @Column()
  @IsInt()
  @Min(4, { message: "Age is to low" })
  @Max(130, { message: "Age is to high" })
  age: number;

  @DeleteDateColumn()
  deleted: boolean;
}
