import { Input } from '@angular/core';

export class AbstractButton {
    @Input() disabled: boolean;
    @Input() titlePlaceholder: string;
}
