import { Injectable } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Address } from 'src/app/models/common/address';
import { AddressDTO } from "swagger-client";

@Injectable({
    providedIn: 'root'
})

export class AddressService {
    private addresses: Array<AddressDTO> = [];
    private addressDTO: AddressDTO = null;
    private address: Address = null;

    constructor(private storageService: StorageService) {
        this.addresses = this.getAllAddresses();
    }

    private getAllAddresses(): Array<AddressDTO> {
        let addresses = [];
        if (this.storageService.hasKey(StorageKey.Addresses)) {
            addresses = this.storageService.getTypedArray(StorageKey.Addresses);
        }
        return addresses;
    }

    public addAddress(address: Address): void {
        this.addressDTO = address;
        this.address = address;
        this.addressDTO.id = this.incrementIndex();
        this.storageService.addData(StorageKey.Addresses, this.addressDTO);
        this.addresses.push(this.addressDTO);
    }

    public getAddressDTO(): AddressDTO {
        return this.addressDTO;
    }

    public getAddress(): Address {
        return this.address;
    }

    private incrementIndex(): number {
        let index: number = 0;
        if (this.addresses != null) {
            index = this.addresses.length;
        }
        return index;
    }
}