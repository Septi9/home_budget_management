import { Injectable } from '@angular/core';
import {ApplicationUser} from "./application-user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OutgoingTransfers} from "./outgoing-transfers";
import {IncomingTransfers} from "./incoming-transfers";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private outgoingBaseURL = "http://localhost:8080/transfers";
  private incomingBaseURL = "http://localhost:8080/incoming-transfers";
  private outgoingBaseURLPost = "http://localhost:8080/transfers-post";
  private incomingBaseURLPost = "http://localhost:8080/incoming-transfers-post";
  private outgoingBaseURLDelete = "http://localhost:8080/transfers-delete";
  private incomingBaseURLDelete = "http://localhost:8080/incoming-transfers-delete";
  private userListURL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }

  public loginApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/login", applicationUser);
  }

  public registerApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/register", applicationUser);
  }

  public getOutgoingTransfersList(): Observable<OutgoingTransfers[]> {
    return this.httpClient.get<OutgoingTransfers[]>(`${this.outgoingBaseURL}`);
  }

  public createOutgoingTransfer(data: any): Observable<OutgoingTransfers[]> {
    return this.httpClient.post<OutgoingTransfers[]>(`${this.outgoingBaseURLPost}`, data);
  }

  public deleteOutgoingTransfer(id : number): Observable<void> {
    return this.httpClient.delete<void>(`${this.outgoingBaseURLDelete}/${id}`);
  }

  public getIncomingTransfersList(): Observable<IncomingTransfers[]> {
    return this.httpClient.get<IncomingTransfers[]>(`${this.incomingBaseURL}`);
  }

  public createIncomingTransfer(data: any): Observable<IncomingTransfers[]> {
    return this.httpClient.post<IncomingTransfers[]>(`${this.incomingBaseURLPost}`, data);
  }

  public deleteIncomingTransfer(id : number): Observable<void> {
    return this.httpClient.delete<void>(`${this.incomingBaseURLDelete}/${id}`);
  }

  public getUserDataList(): Observable<ApplicationUser[]> {
    return this.httpClient.get<ApplicationUser[]>(`${this.userListURL}`);
  }

}
