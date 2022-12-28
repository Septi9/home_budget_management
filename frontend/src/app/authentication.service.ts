import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(email: string | undefined) {
    if (typeof email === "string") {
      sessionStorage.setItem('email', email);
    }
    return true;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('email');
  }
}
