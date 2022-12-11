import { Injectable } from '@angular/core';
import {ApplicationUser} from "./application-user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OutgoingTransfers} from "./outgoing-transfers";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = "http://localhost:8080/transfers";
  private baseURLPost = "http://localhost:8080/transfers-post";

  constructor(private httpClient: HttpClient) { }

  public loginApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/login", applicationUser);
  }

  public registerApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/register", applicationUser);
  }

  public getOutgoingTransfersList(): Observable<OutgoingTransfers[]> {
    return this.httpClient.get<OutgoingTransfers[]>(`${this.baseURL}`);
  }

  public create(data: any): Observable<OutgoingTransfers[]> {
    return this.httpClient.post<OutgoingTransfers[]>(`${this.baseURLPost}`, data);
  }

}
