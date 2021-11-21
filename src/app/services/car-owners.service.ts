import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Owner } from "../models/owner.model";

@Injectable({
  providedIn: 'root'
})
export class ICarOwnersService {
  constructor(private http: HttpClient) {}

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>('api/owners');
  }

  getOwnerById(id: number): Observable<Owner> {
    return this.http.get<Owner>(`api/owners/${id}`);
  }

  createOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>('api/owners', owner);
  }

  editOwner(owner: Owner): Observable<Owner[]> {
    const id = owner.id;
    return this.http.put<Owner>(`api/owners?id=${id}`, owner).pipe(
      switchMap(() => this.getOwners())
    );
  }

  deleteOwner(aOwnerId: number): Observable<Owner[]> {
    return this.http.delete<Owner[]>(`api/owners/${aOwnerId}`).pipe(
      switchMap(() => this.getOwners())
    );
  }
}
