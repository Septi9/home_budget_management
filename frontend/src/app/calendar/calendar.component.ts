import {Component, OnInit} from '@angular/core';
import {CalendarDate} from "../calendar-date";
import {OutgoingTransfers} from "../outgoing-transfers";
import {IncomingTransfers} from "../incoming-transfers";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar : CalendarDate[] = [];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public showMonth: string | undefined;
  private monthNumber: number = 0;
  trigger: number = 0;
  transfersOut: string[] = [""];
  transfersIn: string[] = [""];

  outgoingTransfers : OutgoingTransfers[] | any;
  incomingTransfers : IncomingTransfers[] | any;
  msg = '';

  constructor(private _service : RegistrationService) { }

  ngOnInit(): void {
    this.generateDays(this.monthNumber);
    this.getOutgoingTransfers();
    this.getIncomingTransfers();
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

  private getOutgoingTransfers() {
    this._service.getOutgoingTransfersList().subscribe(data => {
        this.outgoingTransfers = data;
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
        this.incomingTransfers = data;
        this.assignTransferInToCalendarDate(this.incomingTransfers)
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
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
          console.log(item_element);
        }
      }
    }
  }


}

