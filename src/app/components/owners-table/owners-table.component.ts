import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner.model';
import { ICarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-owners-table',
  templateUrl: './owners-table.component.html',
  styleUrls: ['./owners-table.component.css']
})
export class OwnersTableComponent implements OnInit {

  displayedColumns: string[] = ['surname', 'name', 'middleName', 'numberOfCars'];
  owners!: Owner[];
  selectedOwner?: Owner;

  constructor(
    private iCarOwnersService: ICarOwnersService
  ) {}

  ngOnInit(): void {
    this.iCarOwnersService.getOwners().subscribe((owners: Owner[]) => {
      this.owners = owners;
    });
  }

  onSelectOwner(owner: Owner): void {
    this.selectedOwner = owner;
  }

  deleteOwner(): void {
    this.iCarOwnersService.deleteOwner(this.selectedOwner.id).subscribe((data) => {
      this.owners = data;
    })
  }
}
