export class DocumentInfo {
    id: number;
    passport: string;
    abroadPassport: string;
    taxNumber: string;
    militaryId: string;

    constructor() {
        this.id = -1;
    }

    clone(): DocumentInfo {
        const info = new DocumentInfo();
        info.id = this.id;
        info.passport = this.passport;
        info.abroadPassport = this.abroadPassport;
        info.taxNumber = this.taxNumber;
        info.militaryId = this.militaryId;
        return info;
    }

    initFrom(doc: DocumentInfo) {
        this.id = doc.id;
        this.passport = doc.passport || '';
        this.abroadPassport = doc.abroadPassport || '';
        this.taxNumber = doc.taxNumber || '';
        this.militaryId = doc.militaryId || '';
    }
}
