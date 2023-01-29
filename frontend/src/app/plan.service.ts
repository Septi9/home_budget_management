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
  private planBaseURLDelete = 'http://localhost:8080/plan-delete';
  private planBaseURLUpdate = 'http://localhost:8080/plan-update';

  constructor(private httpClient: HttpClient) { }

  public createPlanElement(data: any): Observable<Plan[]> {
    return this.httpClient.post<Plan[]>(`${this.planBaseURLPost}`, data);
  }

  public getPlanList(): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(`${this.planBaseURL}`);
  }

  public deletePlan(id : number): Observable<void> {
    return this.httpClient.delete<void>(`${this.planBaseURLDelete}/${id}`);
  }

  public updatePlan(data: any): Observable<Plan[]> {
    return this.httpClient.put<Plan[]>(`${this.planBaseURLUpdate}`, data);
  }
}
