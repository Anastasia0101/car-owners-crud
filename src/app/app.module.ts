import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ICarOwnersService } from './services/car-owners.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100})
  ],
  providers: [
    ICarOwnersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

