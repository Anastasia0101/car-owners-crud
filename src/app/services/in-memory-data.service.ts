import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let owners = [
      {
        id: 1,
        name: 'Іван',
        surname: 'Іванов',
        middleName: 'Іванович',
        numberOfCars: 1,
        cars: [
          { licensePlate: 'AK9265AK', producer: 'Kia', model: 'Sonet', yearOfProduction: 2009 }
        ]
      },
      {
        id: 2,
        name: 'Наталія',
        surname: 'Петрова',
        middleName: 'Ігорівна',
        numberOfCars: 2,
        cars: [
          { licensePlate: 'AX2121HP', producer: 'HYUNDAI', model: 'Accent', yearOfProduction: 2009 },
          { licensePlate: 'BC7286AE', producer: 'KIA', model: 'Optima', yearOfProduction: 2019 }
        ]
      },
      {
        id: 3,
        name: 'Олексій',
        surname: 'Антонов',
        middleName: 'Сергійович',
        numberOfCars: 1,
        cars: [
          { licensePlate: 'AE9335AE', producer: 'Hyundai', model: 'Hyundai Creta', yearOfProduction: 2016 }
        ]
      },
    ];
    return { owners };
  }
}
