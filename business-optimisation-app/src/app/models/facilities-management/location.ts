import { Base } from '../common/base';
import { Address } from '../common/address';

export class Location implements Base {
    id: number;
    address: Address;
    comment: string;
}