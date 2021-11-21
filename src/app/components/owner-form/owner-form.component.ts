import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent {

  ownerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private iCarOwnersService: ICarOwnersService,
    private router: Router
  ) {
    this.ownerForm = this.formBuilder.group({
      surname: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Zа-яА-Я]*')
        ]
      ],
      name: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Zа-яА-Я]*')
        ]
      ],
      middleName: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Zа-яА-Я]*')
        ]
      ],
      cars: this.formBuilder.array([this.buildCars()])
    });
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

  // get cars(): FormArray {
  //   return this.ownerForm.get('cars') as FormArray;
  // }

  onFormSubmit(): void {
    let ownerFormData = this.ownerForm.value as Owner;
    ownerFormData.numberOfCars = ownerFormData.cars.length;
    this.iCarOwnersService.createOwner(ownerFormData).subscribe();
    this.router.navigate(['home']);
  }
}
