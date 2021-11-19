import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Owner } from "../models/owner.model";

@Injectable({
  providedIn: 'root'
})
export class ICarOwnersService {
  constructor(private http: HttpClient) {}

  search(): Observable<Owner[]> {
    return this.http.get<Owner[]>('api/owners');
  }
}
