import { Injectable } from '@angular/core';
import {ApplicationUser} from "./application-user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public loginApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/login", applicationUser);
  }

  public registerApplicationUser(applicationUser: ApplicationUser) : Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/register", applicationUser);
  }

}
