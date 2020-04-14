import { Employee } from '../hr/employee';

export class History{
    id: number;
    type: string;
    date: Date;
    user: Employee;
    newInfo: Object;
    oldInfo: Object;
}