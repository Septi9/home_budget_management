import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { CryptoComponent } from './crypto/crypto.component';
import { NavComponent } from './nav/nav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';
import { LogoutComponent } from './logout/logout.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GridPipe } from './grid.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { PlanComponent } from './plan/plan.component';
import { ConverterComponent } from './converter/converter.component';
import { DiagramsComponent } from './diagrams/diagrams.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CryptoComponent,
    NavComponent,
    TopnavComponent,
    SearchComponent,
    HistoryComponent,
    LogoutComponent,
    CalendarComponent,
    GridPipe,
    PlanComponent,
    ConverterComponent,
    DiagramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
