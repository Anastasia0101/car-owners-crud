import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from 'src/app/models/owner-entity.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-owners-page',
  templateUrl: './owners-page.component.html',
  styleUrls: ['./owners-page.component.css']
})
export class OwnersPageComponent implements OnInit {

  displayedColumns: string[] = ['surname', 'name', 'middleName', 'numberOfCars'];
  owners!: OwnerEntity[];
  selectedOwner?: OwnerEntity;

  constructor(
    private iCarOwnersService: ICarOwnersService
  ) {}

  ngOnInit(): void {
    this.iCarOwnersService.getOwners().subscribe((owners: OwnerEntity[]) => {
      this.owners = owners;
    });
  }

  onSelectOwner(owner: OwnerEntity): void {
    this.selectedOwner = owner;
  }

  deleteOwner(): void {
    this.iCarOwnersService.deleteOwner(this.selectedOwner.id).subscribe((data) => {
      this.owners = data;
    });
    this.selectedOwner = null;
  }
}
