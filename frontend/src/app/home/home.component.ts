import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";
import {OutgoingTransfers} from "../outgoing-transfers";
import {PlanService} from "../plan.service";
import {Plan} from "../plan";
import {IncomingTransfers} from "../incoming-transfers";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountData : ApplicationUser[] | undefined;
  msg = '';
  sessionValue: any;
  firstname: any;
  lastname: any;
  email: any;
  accountBalance: any;
  outgoingTransfers : OutgoingTransfers[] | undefined;
  incomingTransfers : IncomingTransfers[] | undefined;
  outgoingTransfersLastMonth : number | undefined;
  incomingTransfersLastMonth : number | undefined;
  categoriesCountOutgoing : number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  categories = [
    "Rozrywka", "Transport", "Finanse", "Zdrowie i Uroda", "Dom i Rachunki",
    "Wydatki Podstawowe", "Jedzenie", "Inne"
  ];
  mostPopularCategory = 'Brak wydatków';
  plans : Plan[] | undefined;
  plannedSum: number = 0;

  constructor(private _service : RegistrationService, private _router: Router, private _planService : PlanService) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
    this.getIncomingTransfers();
    this.getOutgoingTransfers();
    this.getPlans();
  }

  private validateUsers(accountData : any) : ApplicationUser[] {
    let data : ApplicationUser[] = [];

    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        data.push(item);
        this.firstname = item.firstname;
        this.lastname = item.lastname;
        this.email = item.email;
        this.accountBalance = (Math.round(item.account_balance * 100) / 100).toFixed(2);
      }
    }
    return data;
  }

  private getUserData() {
    this._service.getUserDataList().subscribe(data => {
      this.accountData = this.validateUsers(data);
    },
      error => {
      this.msg = error.error;
      });
  }

  private getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = this.validateOutgoingTransfers(data);
      this.outgoingTransfersLastMonth = this.getLastMonthTransfers(this.outgoingTransfers);
      this.categoriesCountOutgoing = this.findCategory(this.outgoingTransfers, this.categoriesCountOutgoing);
      this.mostPopularCategory = this.findMostPopularCategory(this.categoriesCountOutgoing);
    }, error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error);
      });
  }

  private getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
      this.incomingTransfers = this.validateIncomingTransfers(data);
      this.incomingTransfersLastMonth = this.getLastMonthTransfers(this.incomingTransfers);
    })
  }

  private validateOutgoingTransfers(outgoingTransfers : any) : OutgoingTransfers[] {
    let data : OutgoingTransfers[] = [];

    for (let item of outgoingTransfers) {
      if (item.outgoing_email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }

  private validateIncomingTransfers(incomingTransfers : any) : IncomingTransfers[] {
    let data : IncomingTransfers[] = [];

    for (let item of incomingTransfers) {
      if (item.incoming_email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }

  private findCategory(transfers : any, array : any) : number[] {
    for(let i = 0; i < transfers.length; i++) {
      for (let j = 0; j < this.categories.length; j++) {
        if (transfers[i].category === this.categories[j]) {
          array[j] += 1;
        }
      }
    }
    return array;
  }

  private findMostPopularCategory(array : any) : string {
    let check = 0;
    let index = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > check) {
        check = array[i];
        index = i;
      }
    }
    return this.categories[index];
  }

  private getPlans() {
    this._planService.getPlanList().subscribe(data => {
        this.plans = this.actualUserPlans(data, this.accountData);
        this.plannedSum = this.sumPlansAmount(this.actualUserPlans(this.plans, this.accountData));
      },
      error => {
        this.msg = error.error;
        console.log(error)
      })
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

  private sumPlansAmount(plans : any) : any {
    let sum = 0;
    for (let item of plans) {
      sum += item.amount;
    }
    return (Math.round(sum * 100) / 100).toFixed(2);
  }

  private getLastMonthTransfers(array : any) : any {
    const now = new Date();
    let month : any;
    if ((now.getMonth()+1) < 10) {
      month = `0${now.getMonth()+1}`;
    } else {
      month = `${now.getMonth()+1}`;
    }
    let value = 0;
    for (let arrayElement of array) {
      if (month === arrayElement.transfer_date.toString().substring(5, 7)) {
        value += arrayElement.transfer_amount;
      }
    }
    console.log(value)
    return (Math.round(value * 100) / 100).toFixed(2);;
  }

}
