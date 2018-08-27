import {EmployeeInterface} from './employee.interface';
import * as moment from 'moment';

const uuidv4 = require('uuid/v4');

const random = (min: number, max: number) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};


export const EMPLOYEES: EmployeeInterface[] = [
  {
    uuid: uuidv4(),
    birthday: moment(),
    name: 'Ted',
    personnelNumber: random(10000, 99999)
  },
  {
    uuid: uuidv4(),
    birthday: moment(),
    name: 'Rick',
    personnelNumber: random(10000, 99999)
  },
  {
    uuid: uuidv4(),
    birthday: moment(),
    name: 'Morty',
    personnelNumber: random(10000, 99999)
  },
];
