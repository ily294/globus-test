import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeComponent} from './employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      meta: {
        title: 'Сотрудники',
        override: true
      }
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
