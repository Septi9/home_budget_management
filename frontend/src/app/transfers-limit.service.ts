import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransfersLimit} from "./transfers-limit";

@Injectable({
  providedIn: 'root'
})
export class TransfersLimitService {

  private limitBaseURL = "http://localhost:8080/limits";
  private limitBaseURLPost = "http://localhost:8080/limits-post";
  private limitBaseURLDelete = 'http://localhost:8080/limit-delete';
  private limitBaseURLUpdate = 'http://localhost:8080/limit-update';

  constructor(private httpClient: HttpClient) { }

  public createLimit(data: any): Observable<TransfersLimit[]> {
    return this.httpClient.post<TransfersLimit[]>(`${this.limitBaseURLPost}`, data);
  }

  public getLimitList(): Observable<TransfersLimit[]> {
    return this.httpClient.get<TransfersLimit[]>(`${this.limitBaseURL}`);
  }

  public deleteLimit(id : number): Observable<void> {
    return this.httpClient.delete<void>(`${this.limitBaseURLDelete}/${id}`);
  }

  public updateLimit(data : any): Observable<TransfersLimit[]> {
    return this.httpClient.put<TransfersLimit[]>(`${this.limitBaseURLUpdate}`, data);
  }
}
