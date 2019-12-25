import { Provider } from './provider';
import { Category } from './category';

export class Unit {
  id: number;
  name: string;
}

export class Material {
  id: number;
  name: string;
  type: Category;
  provider: Provider;
  description: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  document: any; // todo Document type
  price: number;
  count: number;
  unit: any; // todo Unit type
  isActive: boolean = true;

  constructor(name: string) {
    this.name = name;
  }
}

export class MaterialBuilder {
  private readonly material: Material;

  constructor (name: string) {
    this.material = new Material(name);
  }
  setId(id: number) {
    this.material.id = id;
    return this;
  }

  setType(type: any) {
    this.material.type = type;
    return this;
  }

  setProvider(provider: Provider) {
    this.material.provider = provider;
    return this;
  }

  setDescription(desc: string) {
    this.material.description = desc;
    return this;
  }

  setWeight(weight: number) {
    this.material.weight = weight;
    return this;
  }

  setHeight(height: number) {
    this.material.height = height;
    return this;
  }

  setLength(length: number) {
    this.material.length = length;
    return this;
  }

  setDocument(doc: any) {
    this.material.document = doc;
    return this;
  }

  setPrice(price: number) {
    this.material.price = price;
    return this;
  }

  setCount(count: number) {
    this.material.count = count;
    return this;
  }

  setUnit(unit: any) {
    this.material.unit = unit;
    return this;
  }

  build(): Material {
    return this.material;
  }
}
