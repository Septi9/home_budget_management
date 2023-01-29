import { Component, OnInit } from '@angular/core';
import {OutgoingTransfers} from "../outgoing-transfers";
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";
import {IncomingTransfers} from "../incoming-transfers";
import {HttpErrorResponse} from "@angular/common/http";
import {ApplicationUser} from "../application-user";
import {identity} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  outgoingTransfers : OutgoingTransfers[] | undefined;
  editOutgoingTransfers : OutgoingTransfers | undefined;
  editIncomingTransfers : IncomingTransfers | undefined;
  incomingTransfers : IncomingTransfers[] | undefined;
  accountData : ApplicationUser[] | undefined;
  transferIn = new IncomingTransfers();
  transferOut = new OutgoingTransfers();
  msg = '';
  sessionValue: any;
  isHidden = true;
  isHiddenUpdateOut = true;
  isHiddenUpdateIn = true;
  isHiddenIn = true;
  isHiddenOut = false;
  categories = [
    "Rozrywka", "Transport", "Finanse", "Zdrowie i Uroda", "Dom i Rachunki",
    "Wydatki Podstawowe", "Jedzenie", "Inne"
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
    console.log(data)
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

  private getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = this.validateOutgoingTransfers(data);
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  private getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = this.validateIncomingTransfers(data);
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
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

  public onAddTransfer(accountData : any, toggle : any) : void {
    if (toggle === 1) {
      for (let item of accountData) {
        if (item.email === this.sessionValue) {
          this.transferOut.outgoing_email = item.email;
        }
      }
      if (this.transferOut.outgoing_email === null) {
        this.transferOut.outgoing_email = "";
      }
      this._service.createOutgoingTransfer(this.transferOut).subscribe(data => {
          window.location.reload();
        },
        error => {
          this.msg = "Something went wrong";
        }
      )
    } else if (toggle === 2) {
      for (let item of accountData) {
        if (item.email === this.sessionValue) {
          this.transferIn.incoming_email = item.email;
        }
      }
      if (this.transferIn.incoming_email === null) {
        this.transferIn.incoming_email = "";
      }
      this._service.createIncomingTransfer(this.transferIn).subscribe(data => {
          window.location.reload();
        },
        error => {
          this.msg = "Something went wrong";
        }
      )
    } else {
      console.log("error");
    }
  }

  public onUpdateTransferOut(accountData : any) : void {
    this._service.updateOutgoingTransfer(accountData).subscribe(data => {
        window.location.reload();
      },
      error => {
        this.msg = "Something went wrong";
      }
    )
  }

  public onUpdateTransferIn(accountData : any) : void {
    this._service.updateIncomingTransfer(accountData).subscribe(data => {
        window.location.reload();
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

}
