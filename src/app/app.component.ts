import { Component } from '@angular/core';
import { ICarOwnersService } from './services/car-owners.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private iCarOwnersService: ICarOwnersService) {}

  ngOnInit(): void {
    this.iCarOwnersService.search().subscribe((owners) => {
      console.log(owners);
    });
  }
}
