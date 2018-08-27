import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeComponent} from './employee.component';
import {EmployeeModalComponent} from './employee-modal/employee-modal.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {ServicesModule} from '../../services/services.module';
import {EmployeeModule as EmployeeComponentModule} from '../../components/employee/employee.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    EmployeeComponentModule,
    ServicesModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [EmployeeComponent, EmployeeModalComponent],
  entryComponents: [EmployeeModalComponent]
})
export class EmployeeModule {
}
