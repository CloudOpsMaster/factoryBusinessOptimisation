export class ContactInfo {
    id: number;
    phone: string;
    eMail: string;
    messenger: string;

    constructor() {
        this.id = -1;
    }

    clone(): ContactInfo {
        const info = new ContactInfo();
        info.id = this.id;
        info.phone = this.phone;
        info.eMail = this.eMail;
        info.messenger = this.messenger;
        return info;
    }

    initFrom(contact: ContactInfo) {
        this.id = contact.id;
        this.phone = contact.phone;
        this.eMail = contact.eMail;
        this.messenger = contact.messenger;
    }
}
