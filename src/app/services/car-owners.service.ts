import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}
