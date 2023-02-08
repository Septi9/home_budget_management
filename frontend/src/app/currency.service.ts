import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyModel} from "./currency-model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http : HttpClient) { }

  getData(x : any): Observable<CurrencyModel> {
    return this.http.get<CurrencyModel>("https://v6.exchangerate-api.com/v6/bd6916961f66b401213643f4/latest/" + x);
  }
}
