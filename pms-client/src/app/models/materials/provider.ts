export class Provider {

  constructor(public id: number,
              public type: any,
              public name: string,
              public address: any,
              public documents: any[]) { // todo types instead of any
  }
}
