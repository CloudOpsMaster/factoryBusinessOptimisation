import { Material } from './material';

export class Category {
  id: number;
  materials: Material[] = [];

  constructor(public name: string) {
    this.id = Math.random() * 10**5;
  }
}
