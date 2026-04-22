import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
id!: number;

  @Column()
  firstName: string = '';

  @Column({ nullable: true })
  middleName: string = '';

  @Column()
  lastName: string = '';

  @Column({ unique: true })
  email: string = '';

  @Column({ nullable: true })
  phone: string = '';

  @Column()
  department: string = '';

  @Column()
  position: string = '';

  @Column({ default: 'Active' })
  status: string = 'Active';

  @Column({ nullable: true })
  profilePicture: string = '';

  @Column({ nullable: true })
  hireDate: Date = new Date();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}