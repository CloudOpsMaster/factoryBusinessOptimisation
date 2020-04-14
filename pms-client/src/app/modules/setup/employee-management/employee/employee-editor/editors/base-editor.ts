import { Input, Directive } from '@angular/core';
import { EmployeeViewMode } from '../../../../../../modules/setup/employee-management/employee/employee-view-mode.enum';

@Directive()
export class BaseEditor {
    @Input() viewMode: EmployeeViewMode = EmployeeViewMode.View;

    get editMode(): boolean {
        return this.viewMode !== EmployeeViewMode.View &&
            this.viewMode !== EmployeeViewMode.Details;
    }
}
