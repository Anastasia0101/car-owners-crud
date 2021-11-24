import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ICarOwnersService } from './services/car-owners.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFormComponent } from './components/owner-form/owner-form.component';
import { CarsFormComponent } from './components/cars-form/cars-form.component';
import { OwnersPageComponent } from './components/owners-page/owners-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerFormComponent,
    CarsFormComponent,
    OwnersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  providers: [
    ICarOwnersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

