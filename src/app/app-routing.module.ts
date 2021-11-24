import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerFormComponent } from './components/owner-form/owner-form.component';
import { OwnersPageComponent } from './components/owners-page/owners-page.component';

const routes: Routes = [
  { path: 'home', component: OwnersPageComponent },
  {
    path: 'form',
    children: [
      { path: '',  component: OwnerFormComponent },
      { path: ':id/:typeOfForm', component: OwnerFormComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
