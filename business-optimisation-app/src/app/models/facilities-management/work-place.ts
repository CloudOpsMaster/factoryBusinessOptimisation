import { Base } from '../common/base';
import { WorkArea } from './work-area';
import { Location} from './location';

export class WorkPlace implements Base {
    id: number;
    name: string;
    workArea: WorkArea;
    location: Location;
    floor: number;
    comment: string;
}