export class InstrumentServis {

    constructor(
        public startDate: Date,
        public endDate: Date,
        public status: string,
        public description: string,
        public id?: number
    ) {}
}

export enum StatusItem {
    Ready = 'Ready',
    NotReady = 'NotReady',
    NotRestored = 'NotRestored'
}
