export class CalendarDate {

  date : Date;
  title : string | undefined;
  isPast: boolean | undefined;
  isToday: boolean | undefined;


  constructor(date: Date) {
    this.date = date;
    this.isPast = date?.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = date?.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

  public getDate() {
    return this.date.toISOString().split("T")[0];
  }
}
