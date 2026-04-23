import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm: string = '';
  departmentFilter: string = '';
  showDeleteModal: boolean = false;
  employeeToDelete: number | null = null;

  departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll(this.searchTerm, this.departmentFilter)
      .subscribe({
        next: (data) => {
          this.employees = [...data];
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading employees:', err);
        }
      });
  }

  onSearch() {
    this.loadEmployees();
  }

  onDepartmentChange() {
    this.loadEmployees();
  }

  confirmDelete(id: number) {
    this.employeeToDelete = id;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  deleteEmployee() {
    if (this.employeeToDelete) {
      this.employeeService.delete(this.employeeToDelete)
        .subscribe(() => {
          this.showDeleteModal = false;
          this.employeeToDelete = null;
          this.loadEmployees();
        });
    }
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800',
      'Resigned': 'bg-purple-100 text-purple-800',
      'Terminated': 'bg-red-200 text-red-900',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
}