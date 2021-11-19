import { Car } from "./car.model";

export interface Owner {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  numberOfCars: 0;
  cars: Car[];
}
