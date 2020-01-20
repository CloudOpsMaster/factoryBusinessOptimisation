import { Input } from '@angular/core';
import { EmployeeViewMode } from '../../employee-view-mode.enum';

export class BaseEditor {
    @Input() viewMode: EmployeeViewMode = EmployeeViewMode.View;

    get editMode(): boolean {
        return this.viewMode !== EmployeeViewMode.View &&
               this.viewMode !== EmployeeViewMode.Details;
    }
}
