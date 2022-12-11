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

  constructor(private _service : RegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.getOutgoingTransfers();
    this.getIncomingTransfers();
  }

  private getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = data;
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  private getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = data;
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

}
