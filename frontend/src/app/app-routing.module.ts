import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CryptoComponent} from "./crypto/crypto.component";
import {HistoryComponent} from "./history/history.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'crypto', component: CryptoComponent, canActivate:[AuthGuardService]},
  {path: 'history', component: HistoryComponent, canActivate:[AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
