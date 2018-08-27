import {Component, OnInit} from '@angular/core';
import {EmployeeInterface} from '../../services/employee/employee.interface';
import {EmployeeService} from '../../services/employee/employee.service';
import {MatDialog} from '@angular/material';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {FormBuilder, FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/internal/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: EmployeeInterface[];
  displayedColumns: string[] = ['name', 'personnelNumber', 'actions'];
  searchControl: FormControl;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.searchControl = this.formBuilder.control('');
  }

  ngOnInit() {

    this.getData();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((text: string) => {
        this.getData(text);
      });
  }


  protected getData(search?: string) {
    this.employeeService.get(search ? {search} : undefined).subscribe((employees) => {
      this.employees = employees;
    });
  }

  onCreate() {
    this.dialog.open(EmployeeModalComponent, {
      data: {
        employee: {},
        saver: this.employeeService.create.bind(this.employeeService)
      }
    }).afterClosed().subscribe(() => {
      this.getData();
    });

  }

  onEdit(employee: EmployeeInterface) {
    this.dialog.open(EmployeeModalComponent, {
      data: {
        employee: employee,
        saver: this.employeeService.update.bind(this.employeeService)
      }
    }).afterClosed().subscribe(() => {
      this.getData();
    });
  }

}
