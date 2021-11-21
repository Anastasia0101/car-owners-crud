import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerFormComponent } from './components/owner-form/owner-form.component';
import { OwnersTableComponent } from './components/owners-table/owners-table.component';

const routes: Routes = [
  { path: 'home', component: OwnersTableComponent },
  { path: 'form', component: OwnerFormComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
