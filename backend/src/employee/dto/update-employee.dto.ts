import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  idNumber: string = ''; // ← added

  @IsOptional()
  @IsString()
  firstName: string = '';

  @IsOptional()
  @IsString()
  middleName: string = '';

  @IsOptional()
  @IsString()
  lastName: string = '';

  @IsOptional()
  @IsEmail()
  email: string = '';

  @IsOptional()
  @IsString()
  phone: string = '';

  @IsOptional()
  @IsString()
  department: string = '';

  @IsOptional()
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