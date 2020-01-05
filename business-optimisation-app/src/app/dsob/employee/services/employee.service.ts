import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
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
    if (!this.storageService.hasKey(StorageKey.EmployeesStorageKey)) {
      this.storageService.setData(StorageKey.EmployeesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeDocumentsStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeDocumentsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeePositionsStorageKey)) {
      this.storageService.setData(StorageKey.EmployeePositionsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeAdressesStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeAdressesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeContactsStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeContactsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeFamiliesStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeFamiliesStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeEducationsStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeEducationsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmploymentsStorageKey)) {
      this.storageService.setData(StorageKey.EmploymentsStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeMedicalCardStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeMedicalCardStorageKey, new Array<Employee>());
    }
    if (!this.storageService.hasKey(StorageKey.EmployeeEnsurancesStorageKey)) {
      this.storageService.setData(StorageKey.EmployeeEnsurancesStorageKey, new Array<Employee>());
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
    this.employeesData = this.storageService.getData(StorageKey.EmployeesStorageKey) || new Array<Employee>();
    this.documents = this.storageService.getData(StorageKey.EmployeeDocumentsStorageKey) || new Array<DocumentInfo>();
    this.positions = this.storageService.getData(StorageKey.EmployeePositionsStorageKey) || new Array<PositionInfo>();
    this.adresses = this.storageService.getData(StorageKey.EmployeeAdressesStorageKey) || new Array<AdressInfo>();
    this.contacts = this.storageService.getData(StorageKey.EmployeeContactsStorageKey) || new Array<ContactInfo>();
    this.families = this.storageService.getData(StorageKey.EmployeeFamiliesStorageKey) || new Array<FamilyInfo>();
    this.educations = this.storageService.getData(StorageKey.EmployeeEducationsStorageKey) || new Array<EducationInfo>();
    this.employments = this.storageService.getData(StorageKey.EmploymentsStorageKey) || new Array<EmploymentInfo>();
    this.medicalCards = this.storageService.getData(StorageKey.EmployeeMedicalCardStorageKey) || new Array<MedicalCard>();
    this.ensurances = this.storageService.getData(StorageKey.EmployeeEnsurancesStorageKey) || new Array<EnsuranceInfo>();
  }

  private writeStorage() {
    this.storageService.setData(StorageKey.EmployeesStorageKey, this.employeesData);
    this.storageService.setData(StorageKey.EmployeeDocumentsStorageKey, this.documents);
    this.storageService.setData(StorageKey.EmployeePositionsStorageKey, this.positions);
    this.storageService.setData(StorageKey.EmployeeAdressesStorageKey, this.adresses);
    this.storageService.setData(StorageKey.EmployeeContactsStorageKey, this.contacts);
    this.storageService.setData(StorageKey.EmployeeFamiliesStorageKey, this.families);
    this.storageService.setData(StorageKey.EmployeeEducationsStorageKey, this.educations);
    this.storageService.setData(StorageKey.EmploymentsStorageKey, this.employments);
    this.storageService.setData(StorageKey.EmployeeMedicalCardStorageKey, this.medicalCards);
    this.storageService.setData(StorageKey.EmployeeEnsurancesStorageKey, this.ensurances);
  }

}
