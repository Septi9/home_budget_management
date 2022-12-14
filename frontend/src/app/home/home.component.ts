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

  constructor(private _service : RegistrationService, private _router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData() {
    this._service.getUserDataList().subscribe(data => {
      this.accountData = data;
    },
      error => {
      this.msg = error.error;
      });
  }

}
