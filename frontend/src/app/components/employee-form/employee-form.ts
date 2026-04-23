import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'Active',
    profilePicture: '',
    hireDate: '',
    idNumber: '' // ← added
  };

  isEditMode: boolean = false;
  employeeId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;

  departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  statuses = ['Active', 'Inactive', 'On Leave', 'Suspended', 'Resigned', 'Terminated'];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.employeeService.getOne(this.employeeId).subscribe({
        next: (data) => {
          this.employee = {
            employeeId: data.employeeId || '',
            idNumber: data.idNumber || '', // ← added
            firstName: data.firstName || '',
            middleName: data.middleName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            department: data.department || '',
            position: data.position || '',
            status: data.status || 'Active',
            profilePicture: data.profilePicture || '',
            hireDate: data.hireDate ? data.hireDate.substring(0, 10) : ''
          };
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMessage = 'Error loading employee!';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.employee.firstName || !this.employee.lastName || !this.employee.email) {
      this.errorMessage = 'First name, last name and email are required!';
      return;
    }

    if (this.isEditMode && this.employeeId) {
      this.employeeService.update(this.employeeId, this.employee).subscribe({
        next: () => {
          this.successMessage = 'Employee updated successfully!';
          setTimeout(() => this.router.navigate(['/employees']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error updating employee!';
        }
      });
    } else {
      this.employeeService.create(this.employee).subscribe({
        next: () => {
          this.successMessage = 'Employee created successfully!';
          setTimeout(() => this.router.navigate(['/employees']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error creating employee!';
        }
      });
    }
  }
}