import { Component, OnInit } from '@angular/core';
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  accountBalance: any;
  sessionValue: any;
  msg = '';

  constructor(private _service : RegistrationService) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
  }

  private getUserData() {
    this._service.getUserDataList().subscribe(data => {
        this.accountBalance = this.validateUsers(data);
      },
      error => {
        this.msg = error.error;
      });
  }

  private validateUsers(accountData : any) : ApplicationUser[] {
    let balance: any;

    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        balance = (Math.round(item.accountBalance * 100) / 100).toFixed(2);
      }
    }
    return balance;
  }

}
