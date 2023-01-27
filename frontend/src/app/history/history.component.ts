import { Component, OnInit } from '@angular/core';
import {OutgoingTransfers} from "../outgoing-transfers";
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";
import {IncomingTransfers} from "../incoming-transfers";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  outgoingTransfers : OutgoingTransfers[] | undefined;
  incomingTransfers : IncomingTransfers[] | undefined;
  msg = '';
  sessionValue: any;
  categories = [
    "Rozrywka", "Transport", "Finanse", "Zdrowie i Uroda", "Dom i Rachunki",
    "Wydatki Podstawowe", "Jedzenie", "Inne"
  ];

  constructor(private _service : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getOutgoingTransfers();
    this.getIncomingTransfers();
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
}
