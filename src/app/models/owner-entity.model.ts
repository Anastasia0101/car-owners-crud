import { CarEntity } from './car-entity.model';

export interface OwnerEntity {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  numberOfCars: number;
  cars: CarEntity[];
}
