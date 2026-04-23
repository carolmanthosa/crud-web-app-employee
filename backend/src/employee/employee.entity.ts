import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  employeeId: string = '';

  @Column({ type: 'varchar', unique: true, nullable: true, default: null })
  idNumber: string | null = null; // ← added type: 'varchar'

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