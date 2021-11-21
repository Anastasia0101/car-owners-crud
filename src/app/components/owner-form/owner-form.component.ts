import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Owner } from 'src/app/models/owner.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  ownerForm: FormGroup;
  ownerId: number;
  isAddOwner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private iCarOwnersService: ICarOwnersService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.ownerId = this.route.snapshot.params.id;
    this.isAddOwner = !this.ownerId;
    if (!this.isAddOwner) {
      this.iCarOwnersService.getOwnerById(this.ownerId).subscribe((owner: Owner) => {
        this.ownerForm.patchValue({
          surname: owner.surname,
          name: owner.name,
          middleName: owner.middleName
        });
        let cars = this.ownerForm.get('cars') as FormArray;
        owner.cars.forEach((own: Car, index: number) => {
          cars.push(this.buildCars());
          cars.controls[index].patchValue({
            licensePlate: own.licensePlate,
            producer: own.producer,
            model: own.model,
            yearOfProduction: own.yearOfProduction
          })
        })
      });
    }
  }

  get cars(): FormArray {
    return this.ownerForm.get('cars') as FormArray;
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

  onFormSubmit(): void {
    let ownerFormData = this.ownerForm.value as Owner;
    ownerFormData.numberOfCars = ownerFormData.cars.length;
    if (this.isAddOwner) {
      this.createOwner(ownerFormData);
    }
    if (!this.isAddOwner) {
      this.editOwner(ownerFormData);
    }
    this.router.navigate(['home']);
  }


  createOwner(ownerData: Owner): void {
    this.iCarOwnersService.createOwner(ownerData).subscribe();
  }

  editOwner(ownerData: Owner): void {
    ownerData.id = this.ownerId;
    this.iCarOwnersService.editOwner(ownerData).subscribe();
  }
}
