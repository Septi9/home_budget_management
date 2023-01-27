import {Component, OnInit, ViewChild} from '@angular/core';
import {Plan} from "../plan";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";
import {HttpErrorResponse} from "@angular/common/http";

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
  planIcon: string | undefined;
  isHidden = true;
  categories = [
    "Rozrywka", "Transport", "Finanse", "Zdrowie i Uroda", "Dom i Rachunki",
    "Wydatki Podstawowe", "Jedzenie", "Inne"
  ];

  constructor(private _service : PlanService, private _serviceR : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
    this.getPlans();
  }

  toggleDisplay() {
    this.isHidden = !this.isHidden;
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
        this.plannedSum = this.sumPlansAmount(this.actualUserPlans(this.plans, this.accountData));
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

  public onDeletePlan(id : number | undefined) : void {
    if (id != null) {
      this._service.deletePlan(id).subscribe(
        (response : void) => {
          this.getPlans();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      console.log("can't delete element");
    }
    window.location.reload();
  }

  private sumPlansAmount(plans : any) : any {
    let sum = 0;
    for (let item of plans) {
      sum += item.amount;
    }
    return (Math.round(sum * 100) / 100).toFixed(2);
  }

  private validateUsers(accountData : any) : ApplicationUser[] {
    let data : ApplicationUser[] = [];

    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        data.push(item);
      }
    }
    console.log(data)
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

  getPlanIcon(description : string | undefined) : string {
    switch (description) {
      case this.categories[0]: return 'beach_access';
      case this.categories[1]: return 'directions_subway';
      case this.categories[2]: return 'attach_money';
      case this.categories[3]: return 'spa';
      case this.categories[4]: return 'home';
      case this.categories[5]: return 'shopping_basket';
      case this.categories[6]: return 'fastfood';
      case this.categories[7]: return 'account_circle';
      default: return 'bug_report';
    }
  }
}
