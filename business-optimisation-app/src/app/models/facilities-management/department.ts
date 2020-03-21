import { TypeOfDepartmnet } from './type-of-department';
import { Base } from '../common/base';

export class Department implements Base {
    id: number;
    comment: string;
    name: string;
    type: string;
}