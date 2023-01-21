import {Component, OnInit, ViewChild} from '@angular/core';
import {Plan} from "../plan";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  @ViewChild('addForm') addForm: any;

  accountData : ApplicationUser[] | undefined;
  plan = new Plan();
  plans : Plan[] | undefined;
  msg = '';
  sessionValue: any;
  sum: number = 0;
  plannedSum: number = 0;

  constructor(private _service : PlanService, private _serviceR : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
    this.getPlans();
  }

  private actualUserPlans(plans : any, accountData : any) : Plan[] {

    let data : Plan[] = [];

    try {
      for(let element of accountData) {
        if (element.email === this.sessionValue) {
          for (let item of plans) {
            if (element.id === item.user_id) {
              data.push(item);
            }
          }
        }
      }
    } catch (e) {
      window.location.reload();
    }
    return data;
  }

  private getPlans() {
    this._service.getPlanList().subscribe(data => {
      this.plans = this.actualUserPlans(data, this.accountData);
      this.sumPlansAmount(this.actualUserPlans(this.plans, this.accountData));
    },
      error => {
        this.msg = error.error;
        console.log(error)
      })
  }

  public onAddPlan(accountData : any) : void {
    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        this.plan.user_id = item.id;
      }
    }
    if (this.plan.user_id === null) {
      this.plan.user_id = 0;
    }
    this._service.createPlanElement(this.plan).subscribe(data => {
        window.location.reload();
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

  private sumPlansAmount(plans : any) : void {

    for (let item of plans) {
      this.plannedSum = this.plannedSum + item.amount;
    }
  }

  private validateUsers(accountData : any) : ApplicationUser[] {
    let data : ApplicationUser[] = [];

    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }

  private getUserData() {
    this._serviceR.getUserDataList().subscribe(data => {
        this.accountData = this.validateUsers(data);
        this.getData(this.accountData);
      },
      error => {
        this.msg = error.error;
      });
  }

  private getData(accountData : any) {
    for (let item of accountData) {
      this.sum = item.accountBalance;
    }
  }
}
