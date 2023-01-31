import {Component, OnInit, ViewChild} from '@angular/core';
import {Plan} from "../plan";
import {PlanService} from "../plan.service";
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OutgoingTransfers} from "../outgoing-transfers";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  @ViewChild('addForm') addForm: any;

  accountData : ApplicationUser[] | undefined;
  outgoingTransfers = new OutgoingTransfers();
  plan = new Plan();
  plans : Plan[] | undefined;
  editPlan : Plan = new Plan();
  msg = '';
  sessionValue: any;
  sum: number = 0;
  plannedSum: number = 0;
  planIcon: string | undefined;
  isHidden = true;
  isHiddenUpdate = true;
  isHiddenPlan = true;
  categoriesOut = [
    "Rozrywka", "Transport", "Rachunki", "Uroda", "Dom",
    "Wydatki Podstawowe", "Jedzenie na Mieście", "Samochód", "Zdrowie", "Ubrania",
    "Zakupy", "Inwestycje", "Hotel", "Prezent", "Sport", "Edukacja", "Dzieci", "Ogród", "Kredyt",
    "Podatki", "Inne"
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

  toggleDisplayUpdate() {
    this.isHiddenUpdate = !this.isHiddenUpdate;
  }

  openUpdateModal(plan : any) {
    this.editPlan = plan;
    this.isHiddenUpdate = !this.isHiddenUpdate;
  }

  toggleDisplayPlan() {
    this.isHiddenPlan = !this.isHiddenPlan;
  }

  toggleIsPeriodic(state : any) {
    console.log(state);
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

  public onUpdatePlan(accountData : any) : void {
    this._service.updatePlan(accountData).subscribe(data => {
      window.location.reload();
    },
      error => {
        this.msg = "Something went wrong";
      }
      )
  }

  public onCarryOutThePlan(id : number | undefined, accountData : any) {
    this.isHiddenPlan = !this.isHiddenPlan;
    console.log(accountData.date.toString().substring(5,7));

    this.outgoingTransfers.transfer_amount = accountData.amount;
    this.outgoingTransfers.transfer_date = new Date();
    this.outgoingTransfers.outgoing_email = this.sessionValue;
    this.outgoingTransfers.category = accountData.plan_desc;
    this.outgoingTransfers.description = accountData.description;

    this._serviceR.createOutgoingTransfer(this.outgoingTransfers).subscribe(data => {
    },
      error => {
        this.msg = "Something went wrong";
      }
      )
    if (!accountData.is_periodic) {
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
    } else {
      if (accountData.cycle === 'Miesiąc') {
        let date = accountData.date.toString().substring(5,7);
        date = parseInt(date, 10);
        date++;
        accountData.date = accountData.date.replace(accountData.date.toString().substring(5,7), date.toString().length === 1 ? '0' + date : date);
      } else if (accountData.cycle === 'Dzień') {
        let date = accountData.date.toString().substring(8,10);
        date = parseInt(date, 10);
        date++;
        accountData.date = accountData.date.replace(accountData.date.toString().substring(8,10), date.toString().length === 1 ? '0' + date : date);
      } else if (accountData.cycle === 'Rok') {
        let date = accountData.date.toString().substring(0,4);
        date = parseInt(date, 10);
        date++;
        accountData.date = accountData.date.replace(accountData.date.toString().substring(0,4), date);
      }
      this._service.updatePlan(accountData).subscribe(data => {
        },
        error => {
          this.msg = "Something went wrong";
        }
      )
    }
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
      case this.categoriesOut[0]: return 'beach_access';
      case this.categoriesOut[1]: return 'directions_subway';
      case this.categoriesOut[2]: return 'attach_money';
      case this.categoriesOut[3]: return 'spa';
      case this.categoriesOut[4]: return 'home';
      case this.categoriesOut[5]: return 'shopping_basket';
      case this.categoriesOut[6]: return 'fastfood';
      case this.categoriesOut[7]: return 'directions_car';
      case this.categoriesOut[8]: return 'healing';
      case this.categoriesOut[9]: return 'local_offer';
      case this.categoriesOut[10]: return 'shopping_cart';
      case this.categoriesOut[11]: return 'trending_up';
      case this.categoriesOut[12]: return 'local_hotel';
      case this.categoriesOut[13]: return 'card_giftcard';
      case this.categoriesOut[14]: return 'fitness_center';
      case this.categoriesOut[15]: return 'school';
      case this.categoriesOut[16]: return 'child_friendly';
      case this.categoriesOut[17]: return 'nature';
      case this.categoriesOut[18]: return 'assignment';
      case this.categoriesOut[19]: return 'money';
      case this.categoriesOut[20]: return 'account_circle';
      default: return 'bug_report';
    }
  }
}
