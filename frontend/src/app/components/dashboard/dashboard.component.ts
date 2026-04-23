import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];

  departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

  constructor(private employeeService: EmployeeService) {}
ngOnInit() {
  this.employeeService.getAll('', '').subscribe({
    next: (data) => { 
      console.log('Dashboard data:', data);
      this.employees = data; 
    },
    error: (err) => { console.error('Dashboard load error:', err); }
  });
}

  get total() { return this.employees.length; }
  get active() { return this.employees.filter(e => e.status === 'Active').length; }
  get onLeave() { return this.employees.filter(e => e.status === 'On Leave').length; }
  get inactive() { return this.employees.filter(e => e.status === 'Inactive').length; }

  getCountByDepartment(dept: string) {
    return this.employees.filter(e => e.department === dept).length;
  }

  getBarWidth(dept: string): string {
    const max = Math.max(...this.departments.map(d => this.getCountByDepartment(d)));
    if (max === 0) return '0%';
    return (this.getCountByDepartment(dept) / max * 100) + '%';
  }

  get recentEmployees() {
    return this.employees.slice(-5).reverse();
  }

 getStatusClass(status: string | undefined): string {
    const classes: any = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Suspended': 'bg-red-100 text-red-800',
      'Resigned': 'bg-purple-100 text-purple-800',
      'Terminated': 'bg-red-200 text-red-900',
    };
   return classes[status ?? ''] || 'bg-gray-100 text-gray-800';
    }
}