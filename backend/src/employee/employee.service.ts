import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  private async generateEmployeeId(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.employeeRepository.count();
    const padded = String(count + 1).padStart(3, '0');
    return `EMP-${year}-${padded}`;
  }

  async findAll(search?: string, department?: string): Promise<Employee[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');

    if (search && department) {
      query
        .where(
          `employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.employeeId LIKE :search OR employee.idNumber LIKE :search`,
          { search: `%${search}%` }
        )
        .andWhere('employee.department = :department', { department });
    } else if (search) {
      query.where(
        `employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.employeeId LIKE :search OR employee.idNumber LIKE :search`,
        { search: `%${search}%` }
      );
    } else if (department) {
      query.where('employee.department = :department', { department });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employeeId = await this.generateEmployeeId();
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      employeeId,
    });
    return this.employeeRepository.save(employee);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    await this.findOne(id);
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.employeeRepository.delete(id);
  }
}