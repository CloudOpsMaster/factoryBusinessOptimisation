export class AdressInfo {
    id: number;
    town: string;
    street: string;
    house: number;
    houseApendix: string;
    appartment: number;

    constructor() {
        this.id = -1;
    }

    clone(): AdressInfo {
        const adress = new AdressInfo();
        adress.id = this.id;
        adress.town = this.town;
        adress.street = this.street;
        adress.house = this.house;
        adress.houseApendix = this.houseApendix;
        adress.appartment = this.appartment;
        return adress;
    }

    initFrom(adress: AdressInfo) {
        this.id = adress.id;
        this.town = adress.town;
        this.street = adress.street;
        this.house = adress.house;
        this.houseApendix = adress.houseApendix;
        this.appartment = adress.appartment;
    }
}
