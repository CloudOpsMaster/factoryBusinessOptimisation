export class MedicalCard {
    id: number;
    disabled: boolean;
    description: string;

    constructor() {
        this.id = -1;
    }

    clone(): MedicalCard {
        const info = new MedicalCard();
        info.id = this.id;
        info.disabled = this.disabled;
        info.description = this.description;
        return info;
    }

    initFrom(card: MedicalCard) {
        this.id = card.id;
        this.disabled = card.disabled;
        this.description = card.description;
    }
}
