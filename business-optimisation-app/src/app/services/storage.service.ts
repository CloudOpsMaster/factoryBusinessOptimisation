import { Injectable } from '@angular/core';

export enum StorageKey {
  Materials = 'materials',
  MaterialProviders = 'materialProviders',
  MaterialUnits = 'materialUnits',
  GettingTools = 'gettingTools',
  Locations = 'LocationsStorageKey',
  Addresses = 'AddressesStorageKey',
  Departments = 'DepartmentStorageKey',
  FacilitiesManagementHistory = "FacilitiesManagementHistoryStorageKey",
  CheckList = 'checkList',

  EmployeesStorageKey = 'EmployeesStorageKey',
  EmployeeDocumentsStorageKey = 'EmployeeDocumentsStorageKey',
  EmployeePositionsStorageKey = 'EmployeePositionsStorageKey',
  EmployeeAdressesStorageKey = 'EmployeeAdressesStorageKey',
  EmployeeContactsStorageKey = 'EmployeeContactsStorageKey',
  EmployeeFamiliesStorageKey = 'EmployeeFamiliesStorageKey',
  EmployeeEducationsStorageKey = 'EmployeeEducationsStorageKey',
  EmploymentsStorageKey = 'EmploymentsStorageKey',
  EmployeeMedicalCardStorageKey = 'EmployeeMedicalCardStorageKey',
  EmployeeEnsurancesStorageKey = 'EmployeeEnsurancesStorageKey',
  // TODO: provide more specific value
  InstrumentsStorageKey = '_services',
  InstrumentsStorageKeyHistory = '_servicesHistory'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = window.localStorage;

  /**
   * Returns data array associated with specified key in local storage
   * @param key storage key
   */
  public getTypedArray<T>(key: StorageKey): T[] {
    if (this.storage.getItem(key)) {
      return JSON.parse(this.storage.getItem(key)) as T[];
    }
    return null;
  }

  /**
   * Returns data associated with specified key in local storage
   * @param key storage key
   */
  public getTypedData<T>(key: StorageKey): T {
    if (this.storage.getItem(key)) {
      return JSON.parse(this.storage.getItem(key)) as T;
    }
    return null;
  }

  /**
   * Returns data associated with specified key in local storage
   * @param key storage key
   */
  public getData(key: StorageKey): any {
    if (this.storage.getItem(key)) {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }

  /**
   * Writes specified value with given key in local storage
   * @param key storage key
   * @param value value to write
   */
  public setData(key: StorageKey, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * add data to storage by specified key.
   * Note: no check on dublication (provide it on your side if any)
   * @param key storage key
   * @param dataToSave data to add
   */
  public addData(key: StorageKey, dataToSave: any) {
    const data = this.getData(key) || [];
    data.push(dataToSave);
    this.setData(key, data);
  }

  /**
   * Determines if storage has specified key.
   * @param key storage key
   */
  public hasKey(key: StorageKey): boolean {
    if (this.storage.getItem(key)) {
      return true;
    }
    return false;
  }

  /**
   * Deletes data asociated with given key
   * @param key storage key
   */
  public deleteData(key: StorageKey): void {
    this.storage.removeItem(key);
  }
}
