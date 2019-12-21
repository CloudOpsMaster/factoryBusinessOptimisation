export class EmploymentInfo {
    id: number;
    employmentDate: Date;
    dismissalDate: Date;
    dismissReason: string;

    constructor() {
        this.id = -1;
    }

    clone(): EmploymentInfo {
        const info = new EmploymentInfo();
        info.id = this.id;
        info.employmentDate = this.employmentDate;
        info.dismissalDate = this.dismissalDate;
        info.dismissReason = this.dismissReason;
        return info;
    }

    initFrom(info: EmploymentInfo) {
        this.id = info.id;
        this.employmentDate = info.employmentDate;
        this.dismissalDate = info.dismissalDate;
        this.dismissReason = info.dismissReason;
    }
}
