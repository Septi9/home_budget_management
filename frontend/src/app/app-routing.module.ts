import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CryptoComponent} from "./crypto/crypto.component";
import {HistoryComponent} from "./history/history.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuardService} from "./auth-guard.service";
import {CalendarComponent} from "./calendar/calendar.component";
import {PlanComponent} from "./plan/plan.component";
import {ConverterComponent} from "./converter/converter.component";
import {DiagramsComponent} from "./diagrams/diagrams.component";
import {LimitComponent} from "./limit/limit.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'crypto', component: CryptoComponent, canActivate:[AuthGuardService]},
  {path: 'history', component: HistoryComponent, canActivate:[AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService]},
  {path: 'calendar', component: CalendarComponent, canActivate:[AuthGuardService]},
  {path: 'plan', component: PlanComponent, canActivate:[AuthGuardService]},
  {path: 'converter', component: ConverterComponent, canActivate:[AuthGuardService]},
  {path: 'diagrams', component: DiagramsComponent, canActivate:[AuthGuardService]},
  {path: 'limit', component: LimitComponent, canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
