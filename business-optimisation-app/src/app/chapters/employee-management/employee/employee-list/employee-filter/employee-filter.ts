import { PositionInfo } from '../../../../../models/hr/position-info';

export class EmployeeFilter {
  firstName: string;
  secondName: string;
  patronymic: string;
  id: string;
  passport: string;
  taxNumber: string;
  position: PositionInfo;
  // TODO: provide more filters

  constructor() {
    this.position = new PositionInfo();
  }
}

