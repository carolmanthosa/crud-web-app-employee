import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Manthosa@1956',
      database: 'employee_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeeModule,
  ],
})
export class AppModule {}