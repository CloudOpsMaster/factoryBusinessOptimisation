import { Injectable, EventEmitter } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { TypeOfDepartmentDTO, DepartmentDTO } from 'swagger-client';
import { Department } from 'src/app/models/facilities-management/department';
import { HistoryService } from '../history.service';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private idForChange: number = 0;
  private typeOfDepartments = TypeOfDepartmentDTO;
  private departments: Array<Department> = [];
  private departmentsDTO: Array<DepartmentDTO> = [];

  public addNewDepartment = new EventEmitter<Department>();
  public removeDepartment = new EventEmitter<number>();
  public changeDepartment = new EventEmitter<Department>();
  public variableDepartment = new EventEmitter<Department>();

  constructor(private storageService: StorageService, private history: HistoryService) {
    this.departments = this.getAllDepartments();
    this.departmentsDTO = this.getAllDepartmentsDTO();
  }

  public getTypeOfDepartments() {
    return this.typeOfDepartments;
  }

  private getAllDepartmentsDTO(): Array<DepartmentDTO> {
    let departments: Array<DepartmentDTO> = [];
    if (this.storageService.hasKey(StorageKey.Departments)) {
      departments = this.storageService.getTypedArray(StorageKey.Departments);
    }
    return departments;
  }

  public getAllDepartments(): Array<Department> {
    let departments: Array<Department> = [];
    if (this.storageService.hasKey(StorageKey.Departments)) {
      departments = this.storageService.getTypedArray(StorageKey.Departments);
    }
    return departments;
  }

  private incrementIndex(): number {
    let index: number = 1;
    if (this.departmentsDTO.length > 0) {
      const allLeght = this.departmentsDTO.length;
      index = this.departmentsDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  private getDepartmentId(id: number): number {
    return this.departments.map(l => { return l.id; }).indexOf(id);
  }

  public add(d: Department): void {
    const department: DepartmentDTO = d;
    department.id = this.incrementIndex();

    this.departments.push(<Department>department);
    this.departmentsDTO.push(department);
    this.addNewDepartment.emit(<Department>department);

    this.storageService.addData(StorageKey.Departments,department);
    this.history.addPointInHistory('Department',department);
  }

  public remove(department: Department): void {
    const idForRemove = this.getDepartmentId(department.id);

    this.departments.splice(idForRemove, 1);
    this.departmentsDTO.splice(idForRemove, 1);

    this.removeDepartment.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Department', department, department);
  }

  public change(department: Department, oldDepartment: Department): void {
    const changableDepartment: DepartmentDTO = department;
    changableDepartment.id = oldDepartment.id;

    this.idForChange = this.getDepartmentId(oldDepartment.id);
    this.departments[this.idForChange] = <Department>changableDepartment;
    this.departmentsDTO[this.idForChange] = changableDepartment;

    this.changeDepartment.emit(<Department>changableDepartment);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Department', changableDepartment, <DepartmentDTO>oldDepartment);
  }
  
  public getDepartmentIdForChange(): number {
    return this.idForChange;
  }

  public setDepartmentById(id: number): void {
    const department = this.departments.find((department: Department) => department.id == id);
    this.variableDepartment.emit(department);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.Departments);
    this.departmentsDTO.forEach((department: DepartmentDTO) => {
      this.storageService.addData(StorageKey.Departments, department);
    })
  }
}
