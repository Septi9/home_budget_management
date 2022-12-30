import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plan} from "./plan";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private planBaseURL = "http://localhost:8080/plans";
  private planBaseURLPost = "http://localhost:8080/plans-post";

  constructor(private httpClient: HttpClient) { }

  public createPlanElement(data: any): Observable<Plan[]> {
    return this.httpClient.post<Plan[]>(`${this.planBaseURLPost}`, data);
  }

  public getPlanList(): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(`${this.planBaseURL}`);
  }
}
