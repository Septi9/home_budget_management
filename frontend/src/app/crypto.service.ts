import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CryptoModel} from "./crypto-model.model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient){ }

  getData(): Observable<CryptoModel[]>  {
    return this.http.get<CryptoModel[]>(environment.cryptoBaseUrl);
  }
}
