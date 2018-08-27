import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmployeeInterface} from '../../../services/employee/employee.interface';
import {Observable} from 'rxjs/index';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { saver: (data: EmployeeInterface) => Observable<any>, employee: EmployeeInterface },
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<any, any>) {
    this.employeeForm = this.formBuilder.group({
      employee: [data.employee]
    });
  }

  ngOnInit() {
  }

  save() {
    const employee = Object.assign(this.data.employee, this.employeeForm.value.employee);
    console.log(this.employeeForm);
    this.data.saver(employee).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }
}
