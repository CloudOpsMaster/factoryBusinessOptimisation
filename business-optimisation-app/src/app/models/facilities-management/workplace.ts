import { Base } from '../common/base';

export class WorkPlace implements Base {
    id: number;
    comment: string;
    address: Location;
    floor: number;
    room: number;
    place: number;
}