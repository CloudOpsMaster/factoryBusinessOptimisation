import { DocumentInfo } from 'src/app/models/HR/DocumentInfo';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { AdressInfo } from 'src/app/models/HR/AdressInfo';
import { ContactInfo } from 'src/app/models/HR/ContactInfo';
import { FamilyInfo } from 'src/app/models/HR/FamilyInfo';
import { EducationInfo } from 'src/app/models/HR/EducationInfo';
import { EmploymentInfo } from 'src/app/models/HR/EmploymentInfo';
import { MedicalCard } from 'src/app/models/HR/MedicalCard';
import { EnsuranceInfo } from 'src/app/models/HR/EnsuranceInfo';
import { Employee } from 'src/app/models/HR/Employee';

export class EmployeeMainInfo {
    id: number;
    firstName: string;
    secondName: string;
    patronymic: string;
    dob: Date;
    photo: string;

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
    }

    clone(): EmployeeMainInfo {
        const mainInfo = new EmployeeMainInfo();
        mainInfo.id = this.id;
        mainInfo.firstName = this.firstName;
        mainInfo.secondName = this.secondName;
        mainInfo.patronymic = this.patronymic;
        mainInfo.dob = this.dob;
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
