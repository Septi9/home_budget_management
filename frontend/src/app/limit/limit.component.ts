import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {TransfersLimitService} from "../transfers-limit.service";
import {TransfersLimit} from "../transfers-limit";
import {OutgoingTransfers} from "../outgoing-transfers";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.css']
})
export class LimitComponent implements OnInit {
  limits: TransfersLimit[] = [];
  outgoingTransfers : OutgoingTransfers[] = [];
  accountData : ApplicationUser[] | undefined;
  user = new ApplicationUser();
  msg = '';
  month : any;
  sessionValue: any;
  isHidden = true;
  isHiddenUpdate = true;
  limit = new TransfersLimit();
  editedLimit : TransfersLimit = new TransfersLimit();
  categories: Map<string | undefined, number> = new Map<string, number>([["Rozrywka", 0], ["Transport", 0], ["Rachunki", 0], ["Uroda", 0], ["Dom", 0],
   ["Wydatki Podstawowe", 0], ["Jedzenie na Mieście", 0], ["Samochód", 0], ["Zdrowie", 0], ["Ubrania", 0],
    ["Zakupy", 0], ["Inwestycje", 0], ["Hotel", 0], ["Prezent", 0], ["Sport", 0], ["Edukacja", 0], ["Dzieci", 0], ["Ogród", 0], ["Kredyt", 0],
    ["Podatki", 0], ["Inne", 0]]);
  monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  constructor(private _service : RegistrationService, private _serviceLimit : TransfersLimitService, private _router : Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
    this.getOutgoingTransfers();
    this.getLimits();
    this.month = this.getActualDate();
  }

  getActualDate() {
    const now = new Date();
    return this.monthNames[now.getMonth()];
  }

  toggleDisplay() {
    this.isHidden = !this.isHidden;
  }

  toggleDisplayUpdate() {
    this.isHiddenUpdate = !this.isHiddenUpdate;
  }

  openUpdateModal(limit : any) {
    this.editedLimit = limit;
    this.isHiddenUpdate = !this.isHiddenUpdate;
  }

  checkValue(a : any, b : any) : boolean {
    return a <= b;
  }

  private getUserData() {
    this._service.getUserDataList().subscribe(data => {
        this.accountData = this.validateUsers(data);
        for (const a of this.accountData) {
          this.user = a;
        }
      },
      error => {
        this.msg = error.error;
      });
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

  public getLimits() {
    this._serviceLimit.getLimitList().subscribe(data => {
      this.limits = this.validateLimits(data, this.accountData);
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  private validateLimits(limits : any, accountData : any) : TransfersLimit[] {
    let data : TransfersLimit[] = [];

    try {
      for (const element of accountData) {
        if (element.email === this.sessionValue) {
          for (const limit of limits) {
            if (element.id === limit.user_id) {
              data.push(limit);
            }
          }
        }
      }
    } catch (e) {
      window.location.reload();
    }
    return data;

  }

  public getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
        this.outgoingTransfers = this.validateOutgoingTransfers(data);
        this.outgoingTransfers = this.getLastMonthTransfers(this.outgoingTransfers);
        this.categories = this.findCategory(this.outgoingTransfers, this.categories);
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
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

  public findCategory(transfers : any, categories : any) : Map<string, number> {
    for(let i = 0; i < transfers.length; i++) {
      for (let key of categories.keys()) {
        if (key === transfers[i].category) {
          let amount = categories.get(transfers[i].category);
          amount += transfers[i].transfer_amount;
          categories.set(transfers[i].category, amount);
        }
      }
    }
    return categories;
  }

  get getBindedMap(){
    return Array.from(this.categories.keys());
  }

  private getLastMonthTransfers(array : any) : any {
    const now = new Date();
    let out : OutgoingTransfers[] = [];
    let month : any;
    if ((now.getMonth()+1) < 10) {
      month = `0${now.getMonth()+1}`;
    } else {
      month = `${now.getMonth()+1}`;
    }
    let value = 0;
    for (let arrayElement of array) {
      if (month === arrayElement.transfer_date.toString().substring(5, 7)) {
        out.push(arrayElement);
      }
    }
    console.log(value);
    console.log((Math.round(value * 100) / 100).toFixed(2))
    return out;
  }

  public onAddPlan(accountData : any) : void {
    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        this.limit.user_id = item.id;
      }
    }
    if (this.limit.user_id === null) {
      this.limit.user_id = 0;
    }
    this._serviceLimit.createLimit(this.limit).subscribe(data => {
        window.location.reload();
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

  public onDeleteLimit(id : number | undefined) : void {
    if (id != null) {
      this._serviceLimit.deleteLimit(id).subscribe(
        (response : void) => {
          this.getLimits();
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

  public onUpdateLimit(accountData : any) : void {
    this._serviceLimit.updateLimit(accountData).subscribe(data => {
        window.location.reload();
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

}
