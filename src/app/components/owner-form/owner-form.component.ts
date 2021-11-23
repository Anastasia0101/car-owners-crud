import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarEntity } from 'src/app/models/car-entity.model';
import { OwnerEntity } from 'src/app/models/owner-entity.model';
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
  isReadOnly = false;
  typeOfForm: string;

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
          Validators.pattern('[a-zA-Zа-яА-ЯІі]*')
        ]
      ],
      name: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Zа-яА-ЯІі]*')
        ]
      ],
      middleName: [
        '', [
          Validators.required,
          Validators.pattern('[a-zA-Zа-яА-ЯІі]*')
        ]
      ],
      cars: this.formBuilder.array([this.buildCars()])
    });
  }

  ngOnInit(): void {
    this.ownerId = this.route.snapshot.params.id;
    this.typeOfForm = this.route.snapshot.params.typeOfForm;
    this.isAddOwner = !this.typeOfForm;
    let cars = this.ownerForm.get('cars') as FormArray;
    if (!this.isAddOwner) {
      this.iCarOwnersService.getOwnerById(this.ownerId).subscribe((owner: OwnerEntity) => {
        this.ownerForm.patchValue({
          surname: owner.surname,
          name: owner.name,
          middleName: owner.middleName
        });
        cars.removeAt(0);
        owner.cars.forEach((own: CarEntity, index: number) => {
          cars.push(this.buildCars());
          cars.controls[index].patchValue({
            licensePlate: own.licensePlate,
            producer: own.producer,
            model: own.model,
            yearOfProduction: own.yearOfProduction
          });
        });
      });
      if (this.typeOfForm === 'read') {
        this.isReadOnly = true;
      }
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
    let ownerFormData = this.ownerForm.value as OwnerEntity;
    ownerFormData.numberOfCars = ownerFormData.cars.length;
    if (this.isAddOwner) {
      this.createOwner(ownerFormData);
    }
    if (!this.isAddOwner) {
      this.editOwner(ownerFormData);
    }
    this.router.navigate(['home']);
  }

  createOwner(ownerData: OwnerEntity): void {
    this.iCarOwnersService.createOwner(ownerData).subscribe();
  }

  editOwner(ownerData: OwnerEntity): void {
    ownerData.id = this.ownerId;
    this.iCarOwnersService.editOwner(ownerData).subscribe();
  }
}
