import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  idNumber: string = ''; // ← employee provides their government ID

  @IsString()
  firstName: string = '';

  @IsOptional()
  @IsString()
  middleName: string = '';

  @IsString()
  lastName: string = '';

  @IsEmail()
  email: string = '';

  @IsOptional()
  @IsString()
  phone: string = '';

  @IsString()
  department: string = '';

  @IsString()
  position: string = '';

  @IsOptional()
  @IsEnum(['Active', 'Inactive', 'On Leave', 'Suspended', 'Resigned', 'Terminated'])
  status: string = 'Active';

  @IsOptional()
  @IsString()
  profilePicture: string = '';

  @IsOptional()
  hireDate: Date = new Date();
}