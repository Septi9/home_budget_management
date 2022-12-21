import {Component, OnInit} from '@angular/core';
import {CalendarDate} from "../calendar-date";

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

  constructor() { }

  ngOnInit(): void {
    this.generateDays(this.monthNumber);
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
}
