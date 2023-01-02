import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationUser} from "../application-user";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountData : ApplicationUser[] | undefined;
  msg = '';
  sessionValue: any;

  constructor(private _service : RegistrationService, private _router: Router) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getUserData();
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

  private getUserData() {
    this._service.getUserDataList().subscribe(data => {
      this.accountData = this.validateUsers(data);
    },
      error => {
      this.msg = error.error;
      });
  }

}
