import {Injectable} from '@angular/core';
import {EmployeeInterface} from './employee.interface';
import * as _ from 'lodash';
import {EMPLOYEES} from './employee.data';
import {Observable, of} from 'rxjs/index';
import * as uuid from 'uuid';

interface EmployeeFilter {
  search: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: EmployeeInterface[];

  constructor() {
    this.employees = EMPLOYEES;
  }


  get(filter?: EmployeeFilter): Observable<EmployeeInterface[]> {

    if (!filter) {
      return of(_.clone(this.employees));
    } else {
      return of(_.filter(this.employees, (item: EmployeeInterface) => {

        return item.name.indexOf(filter.search) >= 0;
      }));
    }

  }

  create(employee: EmployeeInterface): Observable<EmployeeInterface> {
    const clonedEmployee = _.clone(employee);
    clonedEmployee.uuid = uuid.v4();
    this.employees.push(clonedEmployee);
    return of(clonedEmployee);
  }

  update(employee: EmployeeInterface): Observable<EmployeeInterface> {

    const findedEmployeeIndex = _.findIndex(this.employees, {uuid: employee.uuid});
    if (findedEmployeeIndex >= 0) {
      this.employees[findedEmployeeIndex] = Object.assign(this.employees[findedEmployeeIndex], employee);
    }

    return of(this.employees[findedEmployeeIndex]);
  }


  delete(uuids: string[]): Observable<number> {
    let len = this.employees.length;
    this.employees = _.dropWhile(this.employees, (item: EmployeeInterface) => {
      for (const uuidString of uuids) {
        if (uuidString === item.uuid) {
          return true;
        }
      }
      return false;
    });
    len -= this.employees.length;
    return of(len);

  }
}
