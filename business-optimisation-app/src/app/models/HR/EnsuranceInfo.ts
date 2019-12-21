export class EnsuranceInfo {
    id: number;
    ensuranceOrganisation: string;
    policyNumber: string;
    description: string;

    constructor() {
        this.id = -1;
    }

    clone(): EnsuranceInfo {
        const info = new EnsuranceInfo();
        info.id = this.id;
        info.ensuranceOrganisation = this.ensuranceOrganisation;
        info.policyNumber = this.policyNumber;
        info.description = this.description;
        return info;
    }

    initFrom(ensurance: EnsuranceInfo) {
        this.id = ensurance.id;
        this.ensuranceOrganisation = ensurance.ensuranceOrganisation;
        this.policyNumber = ensurance.policyNumber;
        this.description = ensurance.description;
    }
}
