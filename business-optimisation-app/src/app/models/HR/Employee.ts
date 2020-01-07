export class Employee {
    id: number;
    firstName: string;
    secondName: string;
    patronymic: string;
    dob: Date;
    /** location of the foto */
    photo: string;
    /** link to position description */
    positionId: number;
    /** link to previous experience records */
    previousExperienceIds: number[];

    constructor() {
        this.id = -1;
        this.positionId = -1;
    }
}
