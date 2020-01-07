export class FamilyInfo {
    id: number;
    status: FamilyStatus;
    statusChangeDate: Date;
    children: Child[]; // TODO: ids of children!!!

    constructor() {
        this.id = -1;
        this.children = new Array<Child>();
    }

    clone(): FamilyInfo {
        const info = new FamilyInfo();
        info.id = this.id;
        info.status = this.status;
        info.statusChangeDate = this.statusChangeDate;
        this.children.forEach(child => {
            info.children.push(child.clone());
        });
        return info;
    }

    initFrom(family: FamilyInfo) {
        this.id = family.id;
        this.status = family.status;
        this.statusChangeDate = family.statusChangeDate;
        this.children = new Array<Child>();
        family.children.forEach(child => {
            const baby = new Child();
            baby.initFrom(child);
            this.children.push(baby);
        });
    }
}

export class Child {
    id: number;
    dob: Date;

    constructor() {
        this.id = -1;
    }

    clone(): Child {
        const child = new Child();
        child.id = this.id;
        child.dob = this.dob;
        return child;
    }

    initFrom(child: Child) {
        this.id = child.id;
        this.dob = child.dob;
    }
}

export enum FamilyStatus {
    Unknown = 'Unknown',
    Single = 'Single',
    Married = 'Married',
    Divorced = 'Divorced'
}
