import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwnerEntity } from 'src/app/models/owner-entity.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent {

  @Input() parentForm!: FormGroup;
  isLicensePlateUnique = true;
  currentYear = new Date().getFullYear();
  lastCarIndex: number;
  isCarGroupValid = true;
  carGroup: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private iCarOwnersService: ICarOwnersService
  ) { }

  addCar(): void {
    this.buildCars();
    this.cars.push(this.carGroup);
    this.checkNewCarValid();
  }

  checkNewCarValid(index?: number): void {
    if (index >= 0) {
      this.carGroup = this.cars.controls[index];
    }
    if (!this.carGroup.valid) {
      this.isCarGroupValid = false;
      return;
    }
    this.isCarGroupValid = true;
  }

  deleteCar(index: number): void {
    this.cars.removeAt(index);
    this.isCarGroupValid = true;
  }

  get cars(): FormArray {
    return this.parentForm.get('cars') as FormArray;
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
