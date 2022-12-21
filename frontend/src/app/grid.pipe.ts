import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grid'
})
export class GridPipe implements PipeTransform {

  transform(daysArray : any, size : number): any {

    let days: any[][] = [];
    let weekDays: any[] = [];

    daysArray.map((day: any, index: number) => {
      weekDays.push(day);

      if (++index % size === 0) {
        days.push(weekDays);
        weekDays = [];
      }
    });

    return days;
  }

}
