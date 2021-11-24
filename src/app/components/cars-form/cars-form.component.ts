import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarEntity } from 'src/app/models/car-entity.model';
import { OwnerEntity } from 'src/app/models/owner-entity.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent {

  @Input() parentForm!: FormGroup;
  @Input() isReadOnly!: boolean;
  currentYear = new Date().getFullYear();
  isCarGroupValid = true;
  isCarExist = false;
  isNumberOfCarMin = true;
  carGroup: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private iCarOwnersService: ICarOwnersService
  ) { }

  addCar(): void {
    this.buildCars();
    this.cars.push(this.carGroup);
    this.checkIsCarGroupValid();
  }

  checkIsCarGroupValid(index?: number): void {
    if (index >= 0) {
      this.carGroup = this.cars.controls[index];
    }
    if (!this.carGroup.valid) {
      this.isCarGroupValid = false;
      return;
    }
    this.checkIfCarExist(this.carGroup.value);
    if (!this.isCarGroupValid) return;
    this.isCarGroupValid = true;
  }

  deleteCar(index: number): void {
    this.cars.removeAt(index);
    if (this.cars.value.length === 1) {
      this.isNumberOfCarMin = true;
    }
    this.isCarGroupValid = true;
    this.isCarExist = false;
  }

  checkIfCarExist(newCar: CarEntity): void {
    this.iCarOwnersService.getOwners().subscribe((owners: OwnerEntity[]) => {
      const foundCar = owners.find((owner: OwnerEntity) => {
        return owner.cars.some((car: CarEntity) => {
          return car.licensePlate === newCar.licensePlate &&
                 car.model === newCar.model &&
                 car.producer === newCar.producer
        });
      });
      if (foundCar) {
        this.isCarExist = true;
        this.isCarGroupValid = false;
        return;
      }
      this.isCarExist = false;
      this.isCarGroupValid = true;
    });
  }

  get cars(): FormArray {
    const cars = this.parentForm.get('cars') as FormArray;
    if (cars.value.length > 1) {
      this.isNumberOfCarMin = false;
    }
    return cars;
  }

  private buildCars(): void {
    this.carGroup = this.formBuilder.group({
      licensePlate: [
        '', [
          Validators.required,
          Validators.pattern('^[A-Z]{2}[0-9]{4}[A-Z]{2}$')
        ]
      ],
      producer: ['', Validators.required],
      model: ['', Validators.required],
      yearOfProduction: [
        '', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.min(1990),
          Validators.max(this.currentYear)
        ]
      ]
    });
  }
}
