export class EducationInfo {
    id: number;
    heiTitle: string;
    graduateDate: Date;
    degree: string;
    speciality: string;

    constructor() {
        this.id = -1;
    }

    clone(): EducationInfo {
        const info = new EducationInfo();
        info.id = this.id;
        info.heiTitle = this.heiTitle;
        info.graduateDate = this.graduateDate;
        info.degree = this.degree;
        info.speciality = this.speciality;
        return info;
    }

    initFrom(info: EducationInfo) {
        this.id = info.id;
        this.heiTitle = info.heiTitle;
        this.graduateDate = info.graduateDate;
        this.degree = info.degree;
        this.speciality = info.speciality;
    }
}
