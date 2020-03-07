import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/common/address';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private localStorage: StorageService) { }

  setAddress(address:Address) : void {
    
  } 
}
