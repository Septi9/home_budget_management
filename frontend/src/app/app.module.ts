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
    GridPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
