import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';
import { StorageService } from 'src/app/storage/storage.service';
import { EmployeeInfo } from '../EmployeeInfo';
import { DocumentInfo } from 'src/app/models/HR/DocumentInfo';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { AdressInfo } from 'src/app/models/HR/AdressInfo';
import { ContactInfo } from 'src/app/models/HR/ContactInfo';
import { FamilyInfo } from 'src/app/models/HR/FamilyInfo';
import { EducationInfo } from 'src/app/models/HR/EducationInfo';
import { EmploymentInfo } from 'src/app/models/HR/EmploymentInfo';
import { MedicalCard } from 'src/app/models/HR/MedicalCard';
import { EnsuranceInfo } from 'src/app/models/HR/EnsuranceInfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /** list of employees from storage */
  employees: Array<EmployeeInfo>;

  private employeesStorageKey = 'EmployeesStorageKey';
  private documentsStorageKey = 'documentsStorageKey';
  private positionsStorageKey = 'positionsStorageKey ';
  private adressesStorageKey = 'adressesStorageKey';
  private contactsStorageKey = 'contactsStorageKey';
  private familiesStorageKey = 'familiesStorageKey';
  private educationsStorageKey = 'educationsStorageKey';
  private employmentsStorageKey = 'employmentsStorageKey';
  private medicalCardStorageKey = 'medicalCardStorageKey';
  private ensurancesStorageKey = 'ensurancesStorageKey';

  private employeesData: Array<Employee>;
  private documents: Array<DocumentInfo>;
  private positions: Array<PositionInfo>;
  private adresses: Array<AdressInfo>;
  private contacts: Array<ContactInfo>;
  private families: Array<FamilyInfo>;
  private educations: Array<EducationInfo>;
  private employments: Array<EmploymentInfo>;
  private medicalCards: Array<MedicalCard>;
  private ensurances: Array<EnsuranceInfo>;

  updateEmployee(employeeInfo: EmployeeInfo) {
    if (employeeInfo.mainInfo.id < 0) {
      this.addNewEmployee(employeeInfo);
    } else {
      this.performUpdateEmployee(employeeInfo);
    }
    this.writeStorage();
    this.createEmployeeList();
  }

  deleteEmployee(employeeInfo: EmployeeInfo) {
    this.employeesData = this.employeesData.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.documents = this.documents.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.positions = this.positions.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.adresses = this.adresses.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.contacts = this.contacts.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.families = this.families.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.educations = this.educations.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.employments = this.employments.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.medicalCards = this.medicalCards.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.ensurances = this.ensurances.filter(i => i.id !== employeeInfo.mainInfo.id);
    this.writeStorage();
    this.createEmployeeList();
  }

  constructor(private storageService: StorageService) {
    this.initializeStorage();
    this.createEmployeeList();
  }

  // adding

  private addNewEmployee(employeeInfo: EmployeeInfo) {
    this.assingEmployeeInfoIds(employeeInfo);

    const employeeData = this.createEmployeeFromInfo(employeeInfo);
    this.employeesData.push(employeeData);

    this.documents.push(employeeInfo.document);
    this.positions.push(employeeInfo.position);
    this.adresses.push(employeeInfo.adress);
    this.contacts.push(employeeInfo.contact);
    this.families.push(employeeInfo.family);
    this.educations.push(employeeInfo.education);
    this.employments.push(employeeInfo.employment);
    this.medicalCards.push(employeeInfo.medicalCard);
    this.ensurances.push(employeeInfo.ensurance);
  }

  private createEmployeeFromInfo(employeeInfo: EmployeeInfo): Employee {
    const employee = new Employee();
    employee.id = employeeInfo.mainInfo.id;
    employee.firstName = employeeInfo.mainInfo.firstName;
    employee.secondName = employeeInfo.mainInfo.secondName;
    employee.patronymic = employeeInfo.mainInfo.patronymic;
    employee.dob = employeeInfo.mainInfo.dob;
    // TODO: rest ids (links) are not needed ?
    return employee;
  }

  private assingEmployeeInfoIds(employeeInfo: EmployeeInfo) {
    let id = 0;
    if (this.employees.length > 0) {
      id = this.employees[this.employees.length - 1].mainInfo.id + 1;
    }
    employeeInfo.mainInfo.id = id;
    employeeInfo.document.id = employeeInfo.mainInfo.id;
    employeeInfo.position.id = employeeInfo.mainInfo.id;
    employeeInfo.adress.id = employeeInfo.mainInfo.id;
    employeeInfo.contact.id = employeeInfo.mainInfo.id;
    employeeInfo.family.id = employeeInfo.mainInfo.id;
    employeeInfo.education.id = employeeInfo.mainInfo.id;
    employeeInfo.employment.id = employeeInfo.mainInfo.id;
    employeeInfo.medicalCard.id = employeeInfo.mainInfo.id;
    employeeInfo.ensurance.id = employeeInfo.mainInfo.id;
  }


  // updating

  private performUpdateEmployee(employeeInfo: EmployeeInfo) {
    this.updateMainInfo(employeeInfo);
    this.updateDocument(employeeInfo);
    this.updatePosition(employeeInfo);
    this.updateAdress(employeeInfo);
    this.updateContacts(employeeInfo);
    // TODO: Family!!!
    this.updateEducation(employeeInfo);
    this.updateEmployment(employeeInfo);
    this.updateMedicalCard(employeeInfo);
    this.updateEnsurance(employeeInfo);
  }

  private updateMainInfo(employeeInfo: EmployeeInfo) {
    const employeeToUpdate = this.employeesData.find(e => e.id === employeeInfo.mainInfo.id);
    if (employeeToUpdate) {
      employeeToUpdate.firstName = employeeInfo.mainInfo.firstName;
      employeeToUpdate.secondName = employeeInfo.mainInfo.secondName;
      employeeToUpdate.patronymic = employeeInfo.mainInfo.patronymic;
      employeeToUpdate.dob = employeeInfo.mainInfo.dob;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find employee for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateDocument(employeeInfo: EmployeeInfo) {
    const doc = this.documents.find(e => e.id === employeeInfo.mainInfo.id);
    if (doc) {
      doc.passport = employeeInfo.document.passport;
      doc.abroadPassport = employeeInfo.document.abroadPassport;
      doc.taxNumber = employeeInfo.document.taxNumber;
      doc.militaryId = employeeInfo.document.militaryId;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find doc for id ', employeeInfo.mainInfo.id);
    }
  }

  private updatePosition(employeeInfo: EmployeeInfo) {
    const pos = this.positions.find(e => e.id === employeeInfo.mainInfo.id);
    if (pos) {
      pos.title = employeeInfo.position.title;
      pos.requirements = employeeInfo.position.requirements;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find position for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateAdress(employeeInfo: EmployeeInfo) {
    const adr = this.adresses.find(e => e.id === employeeInfo.mainInfo.id);
    if (adr) {
      adr.town = employeeInfo.adress.town;
      adr.street = employeeInfo.adress.street;
      adr.house = employeeInfo.adress.house;
      adr.houseApendix = employeeInfo.adress.houseApendix;
      adr.appartment = employeeInfo.adress.appartment;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find adress for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateContacts(employeeInfo: EmployeeInfo) {
    const contact = this.contacts.find(e => e.id === employeeInfo.mainInfo.id);
    if (contact) {
      contact.phone = employeeInfo.contact.phone;
      contact.eMail = employeeInfo.contact.eMail;
      contact.messenger = employeeInfo.contact.messenger;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find contact for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateEducation(employeeInfo: EmployeeInfo) {
    const education = this.educations.find(e => e.id === employeeInfo.mainInfo.id);
    if (education) {
      education.heiTitle = employeeInfo.education.heiTitle;
      education.graduateDate = employeeInfo.education.graduateDate;
      education.degree = employeeInfo.education.degree;
      education.speciality = employeeInfo.education.speciality;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find education for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateEmployment(employeeInfo: EmployeeInfo) {
    const emp = this.employments.find(e => e.id === employeeInfo.mainInfo.id);
    if (emp) {
      emp.employmentDate = employeeInfo.employment.employmentDate;
      emp.dismissalDate = employeeInfo.employment.dismissalDate;
      emp.dismissReason = employeeInfo.employment.dismissReason;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find employment info for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateMedicalCard(employeeInfo: EmployeeInfo) {
    const med = this.medicalCards.find(e => e.id === employeeInfo.mainInfo.id);
    if (med) {
      med.disabled = employeeInfo.medicalCard.disabled;
      med.description = employeeInfo.medicalCard.description;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find medical card for id ', employeeInfo.mainInfo.id);
    }
  }

  private updateEnsurance(employeeInfo: EmployeeInfo) {
    const ens = this.ensurances.find(e => e.id === employeeInfo.mainInfo.id);
    if (ens) {
      ens.ensuranceOrganisation = employeeInfo.ensurance.ensuranceOrganisation;
      ens.policyNumber = employeeInfo.ensurance.policyNumber;
      ens.description = employeeInfo.ensurance.description;
    } else {
      console.error('EmployeeService.updateMainInfo: can not find ensurance for id ', employeeInfo.mainInfo.id);
    }
  }



  // read - write

  private initializeStorage() {
    if (!this.storageService.has(this.employeesStorageKey)) {
      this.storageService.set(this.employeesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.documentsStorageKey)) {
      this.storageService.set(this.documentsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.positionsStorageKey)) {
      this.storageService.set(this.positionsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.adressesStorageKey)) {
      this.storageService.set(this.adressesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.contactsStorageKey)) {
      this.storageService.set(this.contactsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.familiesStorageKey)) {
      this.storageService.set(this.familiesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.educationsStorageKey)) {
      this.storageService.set(this.educationsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.employmentsStorageKey)) {
      this.storageService.set(this.employmentsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.medicalCardStorageKey)) {
      this.storageService.set(this.medicalCardStorageKey, new Array<Employee>());
    }
    if (!this.storageService.has(this.ensurancesStorageKey)) {
      this.storageService.set(this.ensurancesStorageKey, new Array<Employee>());
    }
  }

  private createEmployeeList() {
    this.readStorage();
    this.employees = new Array<EmployeeInfo>();
    this.employeesData.forEach(employee => {
      const employeeInfo = new EmployeeInfo();

      employeeInfo.mainInfo.initFrom(employee);
      employeeInfo.document.initFrom(this.documents.find(i => i.id === employee.id) || new DocumentInfo());
      employeeInfo.position.initFrom(this.positions.find(i => i.id === employee.id) || new PositionInfo());
      employeeInfo.adress.initFrom(this.adresses.find(i => i.id === employee.id) || new AdressInfo());
      employeeInfo.contact.initFrom(this.contacts.find(i => i.id === employee.id) || new ContactInfo());
      employeeInfo.family.initFrom(this.families.find(i => i.id === employee.id) || new FamilyInfo());
      employeeInfo.education.initFrom(this.educations.find(i => i.id === employee.id) || new EducationInfo());
      employeeInfo.employment.initFrom(this.employments.find(i => i.id === employee.id) || new EmploymentInfo());
      employeeInfo.medicalCard.initFrom(this.medicalCards.find(i => i.id === employee.id) || new MedicalCard());
      employeeInfo.ensurance.initFrom(this.ensurances.find(i => i.id === employee.id) || new EnsuranceInfo());

      this.employees.push(employeeInfo);
    });
  }

  private readStorage() {
    this.employeesData = this.storageService.get(this.employeesStorageKey) || new Array<Employee>();
    this.documents = this.storageService.get(this.documentsStorageKey) || new Array<DocumentInfo>();
    this.positions = this.storageService.get(this.positionsStorageKey) || new Array<PositionInfo>();
    this.adresses = this.storageService.get(this.adressesStorageKey) || new Array<AdressInfo>();
    this.contacts = this.storageService.get(this.contactsStorageKey) || new Array<ContactInfo>();
    this.families = this.storageService.get(this.familiesStorageKey) || new Array<FamilyInfo>();
    this.educations = this.storageService.get(this.educationsStorageKey) || new Array<EducationInfo>();
    this.employments = this.storageService.get(this.employmentsStorageKey) || new Array<EmploymentInfo>();
    this.medicalCards = this.storageService.get(this.medicalCardStorageKey) || new Array<MedicalCard>();
    this.ensurances = this.storageService.get(this.ensurancesStorageKey) || new Array<EnsuranceInfo>();
  }

  private writeStorage() {
    this.storageService.set(this.employeesStorageKey, this.employeesData);
    this.storageService.set(this.documentsStorageKey, this.documents);
    this.storageService.set(this.positionsStorageKey, this.positions);
    this.storageService.set(this.adressesStorageKey, this.adresses);
    this.storageService.set(this.contactsStorageKey, this.contacts);
    this.storageService.set(this.familiesStorageKey, this.families);
    this.storageService.set(this.educationsStorageKey, this.educations);
    this.storageService.set(this.employmentsStorageKey, this.employments);
    this.storageService.set(this.medicalCardStorageKey, this.medicalCards);
    this.storageService.set(this.ensurancesStorageKey, this.ensurances);
  }

}
