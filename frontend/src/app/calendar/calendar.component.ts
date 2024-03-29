import {Component, OnInit} from '@angular/core';
import {CalendarDate} from "../calendar-date";
import {OutgoingTransfers} from "../outgoing-transfers";
import {IncomingTransfers} from "../incoming-transfers";
import {RegistrationService} from "../registration.service";
import {PlanService} from "../plan.service";
import {Plan} from "../plan";
import {ApplicationUser} from "../application-user";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar : CalendarDate[] = [];
  monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  categoriesOut = [
    "Rozrywka", "Transport", "Rachunki", "Uroda", "Dom",
    "Wydatki Podstawowe", "Jedzenie na Mieście", "Samochód", "Zdrowie", "Ubrania",
    "Zakupy", "Inwestycje", "Hotel", "Prezent", "Sport", "Edukacja", "Dzieci", "Ogród", "Kredyt",
    "Podatki", "Inne"
  ];
  categoriesIn = [
    "Pensja", "Premia", "Prezent", "Inwestycje", "Zwrot", "Odsetki", "Inne"
  ];
  public showMonth: string | undefined;
  private monthNumber: number = 0;
  trigger: number = 0;
  transfersOut: string[] = [""];
  transfersIn: string[] = [""];
  plansCalendar: string[] = [""];

  outgoingTransfers : OutgoingTransfers[] | any;
  incomingTransfers : IncomingTransfers[] | any;
  plans : Plan[] | any;
  accountData : ApplicationUser[] | undefined;
  msg = '';
  sessionValue: any;
  isHidden = true;
  element: string | undefined;

  constructor(private _service : RegistrationService, private _servicePlan : PlanService) { }

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.generateDays(this.monthNumber);
    this.getOutgoingTransfers();
    this.getIncomingTransfers()
    this.getUserData();
    this.getPlans();
  }

  private generateDays(monthNumber : number) {
    this.calendar = [];
    let date : Date = new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber));
    this.showMonth = this.monthNames[date.getMonth()];

    let dateToAdd = this.getStartDate(date);

    for (let i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDate(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }


  private getStartDate(date: Date) {
    let startDate: Date = new Date(date.setDate(0));

    if (startDate.getDay() != 1) {
      do {
        startDate = new Date(startDate.setDate(startDate.getDate() - 1));
      } while (startDate.getDay() != 1);
    }

    return startDate;
  }

  public increaseMonth() {
    this.monthNumber++;
    this.generateDays(this.monthNumber);
  }

  public decreaseMonth() {
    this.monthNumber--
    this.generateDays(this.monthNumber);
  }

  public setCurrentMonth() {
    this.monthNumber = 0;
    this.generateDays(this.monthNumber);
  }

  private validateOutgoingTransfers(outgoingTransfers : any) : OutgoingTransfers[] {
    let data : OutgoingTransfers[] = [];

    for (let item of outgoingTransfers) {
      if (item.outgoing_email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }

  private validateIncomingTransfers(incomingTransfers : any) : IncomingTransfers[] {
    let data : IncomingTransfers[] = [];

    for (let item of incomingTransfers) {
      if (item.incoming_email === this.sessionValue) {
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

  private validateUsers(accountData : any) : ApplicationUser[] {
    let data : ApplicationUser[] = [];

    for (let item of accountData) {
      if (item.email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }


  private getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
        this.outgoingTransfers = this.validateOutgoingTransfers(data);
        this.assignTransferOutToCalendarDate(this.outgoingTransfers);
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  private getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = this.validateIncomingTransfers(data);
        this.assignTransferInToCalendarDate(this.incomingTransfers)
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }

  private getPlans() {
    this._servicePlan.getPlanList().subscribe(data => {
        this.plans = this.actualUserPlans(data, this.accountData);
        this.assignPlansToCalendarDate(this.plans);
      },
      error => {
        this.msg = error.error;
        console.log(error)
      })
  }

  private actualUserPlans(plans : any, accountData : any) : Plan[] {
    let data : Plan[] = [];
    try {
      for(let element of accountData) {
        if (element.email === this.sessionValue) {
          for (let item of plans) {
            if (element.id === item.user_id) {
              data.push(item);
            }
          }
        }
      }
    } catch (e) {
      window.location.reload();
    }
    return data;
  }

  getDay(date : Date | any) {
    return date.toString().substring(8, 10);
  }

  getDayFromShortDate(date : string) {
    return date.substring(0, 2);
  }

  getMonth(date : Date | any) {
    return date.toString().substring(5, 7);
  }

  getMonthFromShortDate(date : string) {
    return date.substring(2, 4);
  }

  getYear(date : Date | any) {
    return date.toString().substring(0, 4);
  }

  getYearFromShortDate(date : string) {
    return date.substring(4, 8);
  }

  assignTransferOutToCalendarDate(data : any) {

    let item_element: string;

    for (let element of data) {
      item_element = this.getDay(element.transfer_date) + this.getMonth(element.transfer_date) + this.getYear(element.transfer_date);

      for (let i = 0; i < this.transfersOut.length; i++) {
        if (this.transfersOut.indexOf(item_element) === -1) {
          this.transfersOut.push(item_element);
          console.log(item_element);
        }
      }
    }
  }

  assignTransferInToCalendarDate(data : any) {

    let item_element: string;

    for (let element of data) {
      item_element = this.getDay(element.transfer_date) + this.getMonth(element.transfer_date) + this.getYear(element.transfer_date);

      for (let i = 0; i < this.transfersIn.length; i++) {
        if (this.transfersIn.indexOf(item_element) === -1) {
          this.transfersIn.push(item_element);
        }
      }
    }
  }

  assignPlansToCalendarDate(data : any) {

    let item_element: string;

    for (let element of data) {
      item_element = this.getDay(element.date) + this.getMonth(element.date) + this.getYear(element.date);

      console.log(element.date);
      console.log("elements", this.getDay(element.date), this.getMonth(element.date), this.getYear(element.date))


      for (let i = 0; i < this.plansCalendar.length; i++) {
        if (this.plansCalendar.indexOf(item_element) === -1) {
          this.plansCalendar.push(item_element);
        }
      }
    }
  }

toggleDisplay() {
    this.isHidden = !this.isHidden;
}

getDayValue(element1 : number, element2 : number, element3 : string) {
    if (element1 < 10 && element2 > 9) {
      this.element = `0${element1}${element2}${element3}`;
    } else if (element2 < 10 && element1 > 9) {
      this.element = `${element1}0${element2}${element3}`;
    } else if (element1 < 10 && element2 < 10) {
      this.element = `0${element1}0${element2}${element3}`;
    } else {
      this.element = `${element1}${element2}${element3}`;
    }
    console.log('element', this.element)
}
  getIconPlan(description : string | undefined) : string {
    switch (description) {
      case this.categoriesOut[0]: return 'beach_access';
      case this.categoriesOut[1]: return 'directions_subway';
      case this.categoriesOut[2]: return 'attach_money';
      case this.categoriesOut[3]: return 'spa';
      case this.categoriesOut[4]: return 'home';
      case this.categoriesOut[5]: return 'shopping_basket';
      case this.categoriesOut[6]: return 'fastfood';
      case this.categoriesOut[7]: return 'directions_car';
      case this.categoriesOut[8]: return 'healing';
      case this.categoriesOut[9]: return 'local_offer';
      case this.categoriesOut[10]: return 'shopping_cart';
      case this.categoriesOut[11]: return 'trending_up';
      case this.categoriesOut[12]: return 'local_hotel';
      case this.categoriesOut[13]: return 'card_giftcard';
      case this.categoriesOut[14]: return 'fitness_center';
      case this.categoriesOut[15]: return 'school';
      case this.categoriesOut[16]: return 'child_friendly';
      case this.categoriesOut[17]: return 'nature';
      case this.categoriesOut[18]: return 'assignment';
      case this.categoriesOut[19]: return 'money';
      case this.categoriesOut[20]: return 'account_circle';
      default: return 'bug_report';
    }
  }

  getIconIn(description : string | undefined) : string {
    switch (description) {
      case this.categoriesIn[0]: return 'work';
      case this.categoriesIn[1]: return 'star_border';
      case this.categoriesIn[2]: return 'card_giftcard';
      case this.categoriesIn[3]: return 'trending_up';
      case this.categoriesIn[4]: return 'replay';
      case this.categoriesIn[5]: return 'monetization_on';
      case this.categoriesIn[6]: return 'account_circle';
      default: return 'bug_report';
    }
  }


}
