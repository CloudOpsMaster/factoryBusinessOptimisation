import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export class Validation {
    private readonly floor: AbstractControl;
    private readonly workSite: AbstractControl;
    private readonly room: AbstractControl;
    private readonly place: AbstractControl;
    private readonly validatorOFNumber: ValidatorFn[] = [
        Validators.required,
        Validators.min(0)
    ];
    private readonly validatorOfString: ValidatorFn[] = [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)
    ];

    constructor(floor: AbstractControl, workSite: AbstractControl, room: AbstractControl, place: AbstractControl) {
        this.floor = floor;
        this.workSite = workSite;
        this.room = room;
        this.place = place;
    }

    public setValidatorsForGuild(): void {
        this.floor.setValidators(this.validatorOFNumber);
        this.workSite.setValidators(this.validatorOfString);
        this.room.clearValidators();
        this.place.setValidators(this.validatorOFNumber);
    }

    public setValidatorsForOffice(): void {
        this.floor.setValidators(this.validatorOFNumber);
        this.workSite.setValidators(this.validatorOfString);
        this.room.setValidators(this.validatorOFNumber);
        this.place.setValidators(this.validatorOFNumber);
    }

    public clearValidations(): void {
        this.floor.clearValidators();
        this.workSite.clearValidators();
        this.room.clearValidators();
        this.place.clearValidators();
    }

    public updateValidators(): void {
        this.floor.updateValueAndValidity();
        this.workSite.updateValueAndValidity();
        this.room.updateValueAndValidity();
        this.place.updateValueAndValidity();
    }
}