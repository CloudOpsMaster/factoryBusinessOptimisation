export class PositionInfo {
    id: number;
    title: string;
    requirements: string; // TODO: provide requirement model ? 

    constructor() {
        this.id = -1;
    }

    clone(): PositionInfo {
        const info = new PositionInfo();
        info.id = this.id;
        info.title = this.title;
        info.requirements = this.requirements;
        return info;
    }

    initFrom(position: PositionInfo) {
        this.id = position.id;
        this.title = position.title;
        this.requirements = position.requirements;
    }

    isAllFieldsNotEmpty(): boolean {
      return this.title && this.title.length > 0
            && this.requirements && this.requirements.length > 0;
    }
}
