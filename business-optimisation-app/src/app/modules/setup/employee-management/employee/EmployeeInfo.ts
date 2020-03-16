import { DocumentInfo } from '../../../../../app/models/hr/document-info';
import { PositionInfo } from '../../../../../app/models/hr/position-info';
import { AdressInfo } from '../../../../../app/models/hr/adress-info';
import { ContactInfo } from '../../../../../app/models/hr/contact-info';
import { FamilyInfo } from '../../../../../app/models/hr/family-info';
import { EducationInfo } from '../../../../../app/models/hr/education-info';
import { EmploymentInfo } from '../../../../../app/models/hr/employment-info';
import { MedicalCard } from '../../../../../app/models/hr/medical-card';
import { EnsuranceInfo } from '../../../../../app/models/hr/ensurance-info';
import { Employee } from '../../../../../app/models/hr/employee';

export class EmployeeMainInfo {
    id: number;
    firstName: string;
    secondName: string;
    patronymic: string;
    dob: Date;
    photo: string;
    signature: string;

    get shortName(): string {
        return this.secondName + ' ' +
            this.firstName.substr(0, 1) + '. ' +
            this.patronymic.substr(0, 1) + '.';
    }

    constructor() {
        this.id = -1;
    }

    initFrom(employee: Employee) {
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.secondName = employee.secondName;
        this.patronymic = employee.patronymic;
        this.dob = employee.dob;
        this.photo = employee.photo;
        this.signature = employee.signature;
    }

    clone(): EmployeeMainInfo {
        const mainInfo = new EmployeeMainInfo();
        mainInfo.id = this.id;
        mainInfo.firstName = this.firstName;
        mainInfo.secondName = this.secondName;
        mainInfo.patronymic = this.patronymic;
        mainInfo.dob = this.dob;
        mainInfo.photo = this.photo;
        mainInfo.signature = this.signature;
        return mainInfo;
    }
}

export class EmployeeInfo {
    mainInfo: EmployeeMainInfo;
    document: DocumentInfo;
    position: PositionInfo;
    adress: AdressInfo;
    contact: ContactInfo;
    family: FamilyInfo;
    education: EducationInfo;
    employment: EmploymentInfo;
    medicalCard: MedicalCard;
    ensurance: EnsuranceInfo;

    constructor() {
        this.mainInfo = new EmployeeMainInfo();
        this.document = new DocumentInfo();
        this.position = new PositionInfo();
        this.adress = new AdressInfo();
        this.contact = new ContactInfo();
        this.family = new FamilyInfo();
        this.education = new EducationInfo();
        this.employment = new EmploymentInfo();
        this.medicalCard = new MedicalCard();
        this.ensurance = new EnsuranceInfo();
    }

    clone(): EmployeeInfo {
        const emp = new EmployeeInfo();
        emp.mainInfo = this.mainInfo.clone();
        emp.document = this.document.clone();
        emp.position = this.position.clone();
        emp.adress = this.adress.clone();
        emp.contact = this.contact.clone();
        emp.family = this.family.clone();
        emp.education = this.education.clone();
        emp.employment = this.employment.clone();
        emp.medicalCard = this.medicalCard.clone();
        emp.ensurance = this.ensurance.clone();
        return emp;
    }
}
