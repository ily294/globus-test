import {Moment} from 'moment';

export interface EmployeeInterface {
  uuid?: string;
  name: string;
  personnelNumber: number;
  birthday: Moment;
}
