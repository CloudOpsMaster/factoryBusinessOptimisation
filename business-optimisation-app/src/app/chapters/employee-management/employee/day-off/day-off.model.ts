export class DayOffForm {
    constructor(
        public name: string,
        public surname: string,
        public id?: string,
    ) {
        this.id = '_' + Math.random().toString(36).substr(2, 9);
    }
}