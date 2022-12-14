import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router : Router, private _service : AuthenticationService) { }

  ngOnInit(): void {
    this._service.logOut();
    this._router.navigate(['/']);
  }

}
