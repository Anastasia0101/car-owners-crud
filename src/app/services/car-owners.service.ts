import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OwnerEntity } from '../models/owner-entity.model';

@Injectable({
  providedIn: 'root'
})
export class ICarOwnersService {
  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>('api/owners');
  }

  getOwnerById(id: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`api/owners/${id}`);
  }

  createOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    owner.id = null;
    return this.http.post<OwnerEntity>('api/owners', owner);
  }

  editOwner(owner: OwnerEntity): Observable<OwnerEntity[]> {
    owner.id = parseInt((owner.id).toString());
    return this.http.put(`api/owners/${owner.id}`, owner).pipe(
      switchMap(() => this.getOwners())
    );
  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(`api/owners/${aOwnerId}`).pipe(
      switchMap(() => this.getOwners())
    );
  }
}
