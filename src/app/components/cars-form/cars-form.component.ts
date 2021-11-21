import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent {

  @Input() parentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildCars();
  }

  addCar(): void {
    this.cars.push(this.buildCars())
  }

  deleteCar(index: number): void {
    this.cars.removeAt(index);
  }

  get cars(): FormArray {
    return this.parentForm.get('cars') as FormArray;
  }

  private buildCars(): FormGroup {
    return this.formBuilder.group({
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
          Validators.max(2021)
        ]
      ]
    });
  }
}
