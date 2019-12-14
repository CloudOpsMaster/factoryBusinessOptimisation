export class Position {
    id: number;
    employeeId: number;
    title: string;
    requirementIds: number[];

    constructor() {
        this.requirementIds = new Array<number>();
    }
}
