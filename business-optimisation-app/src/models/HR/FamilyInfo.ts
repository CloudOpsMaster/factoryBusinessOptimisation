export class FamilyInfo {
    id: number;
    status: FamilyStatus;
    statusChangeDate: Date;
    children: Child[];

    constructor() {
        this.children = new Array<Child>();
    }
}

export class Child {
    id: number;
    dob: Date;
}

export enum FamilyStatus {
    Unknown,
    Single,
    Married,
    Divorced
}
