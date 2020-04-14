import { Input, Directive } from '@angular/core';

@Directive()
export class AbstractButton {
    @Input() disabled: boolean;
    @Input() titlePlaceholder: string;
}
