import { Component, OnInit } from '@angular/core';
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  accountData : ApplicationUser[] | undefined;
  accountBalance: any;
  sessionValue: any;
  name: any;
  msg = '';

  constructor(private _service : RegistrationService) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
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
        data.push(item.email);
        this.name = item.firstname + " " + item.lastname;
      }
    }
    return data;
  }

}
