import { Component, OnInit } from '@angular/core';
import {OutgoingTransfers} from "../outgoing-transfers";
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";
import {IncomingTransfers} from "../incoming-transfers";
import {HttpErrorResponse} from "@angular/common/http";
import {ApplicationUser} from "../application-user";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  outgoingTransfers : OutgoingTransfers[] = [];
  editOutgoingTransfers : OutgoingTransfers | undefined;
  editIncomingTransfers : IncomingTransfers | undefined;
  incomingTransfers : IncomingTransfers[] = [];
  accountData : ApplicationUser[] | undefined;
  user = new ApplicationUser();
  transferIn = new IncomingTransfers();
  transferOut = new OutgoingTransfers();
  msg = '';
  sessionValue: any;
  isHidden = true;
  isHiddenUpdateOut = true;
  isHiddenUpdateIn = true;
  isHiddenIn = true;
  isHiddenOut = false;
  isHiddenModal = true;
  isHiddenModalIn = true;
  isHiddenMainPageOut = false;
  isHiddenMainPageIn = true;
  amount = 0;
  inputOut = 0;
  inputIn = 0;
  id_transaction: number | undefined = 0;
  amount_transaction: number | undefined = 0;
  categoriesOut = [
    "Rozrywka", "Transport", "Rachunki", "Uroda", "Dom",
    "Wydatki Podstawowe", "Jedzenie na Mieście", "Samochód", "Zdrowie", "Ubrania",
    "Zakupy", "Inwestycje", "Hotel", "Prezent", "Sport", "Edukacja", "Dzieci", "Ogród", "Kredyt",
    "Podatki", "Inne"
  ];
  categoriesIn = [
    "Pensja", "Premia", "Prezent", "Inwestycje", "Zwrot", "Odsetki", "Inne"
  ];

  constructor(private _service : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
    this.getOutgoingTransfers();
    this.getIncomingTransfers();
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

  toggleDisplay() {
    this.isHidden = !this.isHidden;
  }

  toggleDisplayUpdate() {
    this.isHiddenUpdateOut = true;
    this.isHiddenUpdateIn = true;
  }

  onOpenUpdateModalOut(transfers : any) {
    this.editOutgoingTransfers = transfers;
    this.isHiddenUpdateOut = !this.isHiddenUpdateOut;
  }

  onOpenUpdateModalIn(transfers : any) {
    this.editIncomingTransfers = transfers;
    this.isHiddenUpdateIn = !this.isHiddenUpdateIn;
  }

  toggleDisplayTransfers() {
    this.isHiddenIn = !this.isHiddenIn;
    this.isHiddenOut = !this.isHiddenOut;
  }

  toggleDisplayModal(id : number | undefined, amount : any) {
    this.isHiddenModal = !this.isHiddenModal;
    this.id_transaction = id;
    this.amount_transaction = amount;
  }

  toggleDisplayModalIn(id : number | undefined, amount : any) {
    this.isHiddenModalIn = !this.isHiddenModalIn;
    this.id_transaction = id;
    this.amount_transaction = amount;
  }

  toggleMain() {
    this.isHiddenMainPageOut = !this.isHiddenMainPageOut;
    this.isHiddenMainPageIn = !this.isHiddenMainPageIn;
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

  public getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = this.validateOutgoingTransfers(data);
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  public getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = this.validateIncomingTransfers(data);
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  getIconPlan(description : string | undefined) : string {
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

  getIconIn(description : string | undefined) : string {
    switch (description) {
      case this.categoriesIn[0]: return 'work';
      case this.categoriesIn[1]: return 'star_border';
      case this.categoriesIn[2]: return 'card_giftcard';
      case this.categoriesIn[3]: return 'trending_up';
      case this.categoriesIn[4]: return 'replay';
      case this.categoriesIn[5]: return 'monetization_on';
      case this.categoriesIn[6]: return 'account_circle';
      default: return 'bug_report';
    }
  }

  public onDeleteIncomingTransfer(id : number | undefined) : void {
    if (id != null) {
      this._service.deleteIncomingTransfer(id).subscribe(
        (response : void) => {
          this.getIncomingTransfers();
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

  public onDeleteOutgoingTransfer(id : number | undefined) : void {
    if (id != null) {
      this._service.deleteOutgoingTransfer(id).subscribe(
        (response : void) => {
          this.getOutgoingTransfers();
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

  public onAddTransfer(accountData : any, toggle : boolean) : void {
    if (!toggle) {
      for (let item of accountData) {
        if (item.email === this.sessionValue) {
          this.transferOut.outgoing_email = item.email;
        }
      }
      if (this.transferOut.outgoing_email === null) {
        this.transferOut.outgoing_email = "";
      }
      this._service.createOutgoingTransfer(this.transferOut).subscribe(data => {
        },
        error => {
          this.msg = "Something went wrong";
        }
      )
    } else if (toggle) {
      for (let item of accountData) {
        if (item.email === this.sessionValue) {
          this.transferIn.incoming_email = item.email;
        }
      }
      if (this.transferIn.incoming_email === null) {
        this.transferIn.incoming_email = "";
      }
      this._service.createIncomingTransfer(this.transferIn).subscribe(data => {
        },
        error => {
          this.msg = "Something went wrong";
        }
      )
    } else {
      console.log("error");
    }
  }

  public onUpdateAccount(transfer : any) : void {
    this._service.updateUser(transfer).subscribe(data => {
      window.location.reload();
    },
      error => {
        this.msg = "Something went wrong";
      });
  }

  public onUpdateAmount(income : IncomingTransfers[], outcome : OutgoingTransfers[], amount : any, typedAmount : any, toggle : boolean) : number {
    let sum = 0;
    for (const incomeElement of income) {
      if (incomeElement.transfer_amount != null) {
        sum += Number(incomeElement.transfer_amount);
      }
    }

    for (const outcomeElement of outcome) {
      if (outcomeElement.transfer_amount != null) {
        sum -= Number(outcomeElement.transfer_amount);
      }
    }

    if (typedAmount != 0) {
      if (toggle) {
        sum += Math.abs((Number(amount)));
        sum -= Math.abs((Number(typedAmount)));
      } else {
        sum -= Math.abs((Number(amount)));
        sum += Math.abs((Number(typedAmount)));
      }
    }

    return sum;
  }

  public onUpdateTransferOut(accountData : any) : void {
    this._service.updateOutgoingTransfer(accountData).subscribe(data => {
      },
      error => {
        this.msg = "Something went wrong";
      }
    );
  }

  public onUpdateTransferIn(accountData : any) : void {
    this._service.updateIncomingTransfer(accountData).subscribe(data => {
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

  public sortDate(data : any) {
    if (data != null) {
      return data.sort((a: { transfer_date: string | number | Date; }, b: { transfer_date: string | number | Date; }) => {
        return <any>new Date(b.transfer_date) - <any>new Date(a.transfer_date);
      });
    } else {
      return data;
    }
  }

  onKeyOut(x : any) {
    this.inputOut = x.target.value;
  }

  onKeyIn(x : any) {
    this.inputIn = x.target.value;
  }
}
