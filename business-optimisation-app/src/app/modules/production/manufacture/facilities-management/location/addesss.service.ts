import { Injectable } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Address } from 'src/app/models/common/address';
import { AddressDTO } from "swagger-client";

@Injectable({
    providedIn: 'root'
})

export class AddressService {
    private addresses: Array<AddressDTO> = [];
    private currentAddress: AddressDTO = null;

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
        this.currentAddress = address;
        this.currentAddress.id = this.incrementIndex();
        this.storageService.addData(StorageKey.Addresses, this.currentAddress);
        this.addresses.push(this.currentAddress);
    }

    public getCurrentAddress(): AddressDTO {
        return this.currentAddress;
    }

    private incrementIndex(): number {
        let index: number = 0;
        if (this.addresses != null) {
            index = this.addresses.length;
        }
        return index;
    }
}