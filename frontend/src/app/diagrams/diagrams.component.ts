import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js";
import {IncomingTransfers} from "../incoming-transfers";
import {RegistrationService} from "../registration.service";
import {OutgoingTransfers} from "../outgoing-transfers";

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {

  title = 'ng2-charts-demo';
  monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];
  private monthNumber: number = 0;
  date : Date = new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber));
  incomingTransfers : IncomingTransfers[] | undefined;
  outgoingTransfers : OutgoingTransfers[] | undefined;
  sessionValue: any;
  msg = '';
  public chart: any;
  public chartIncoming: any;
  public chartOutgoing: any;
  monthsIncoming : number[] = [0, 0, 0, 0, 0, 0, 0];
  monthsOutgoing : number[] = [0, 0, 0, 0, 0, 0, 0];
  categoriesOut = [
    "Rozrywka", "Transport", "Rachunki", "Uroda", "Dom",
    "Wydatki Podstawowe", "Jedzenie na Mieście", "Samochód", "Zdrowie", "Ubrania",
    "Zakupy", "Inwestycje", "Hotel", "Prezent", "Sport", "Edukacja", "Dzieci", "Ogród", "Kredyt",
    "Podatki", "Inne"
  ];
  categoriesIn = [
    "Pensja", "Premia", "Prezent", "Inwestycje", "Zwrot", "Odsetki", "Inne"
  ];
  categoriesCountIncoming : number[] = [0, 0, 0, 0, 0, 0, 0];
  categoriesCountOutgoing : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  isHidden = true;
  toggle1 = false;
  toggle2 = false;

  constructor(private _service : RegistrationService) {}

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getTransfers();
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

  private validateOutgoingTransfers(outgoingTransfers : any) : OutgoingTransfers[] {
    let data : OutgoingTransfers[] = [];

    for (let item of outgoingTransfers) {
      if (item.outgoing_email === this.sessionValue) {
        data.push(item);
      }
    }
    return data;
  }

  private getTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = this.validateIncomingTransfers(data);
        this.monthlyTransfers(this.incomingTransfers, this.monthsIncoming);
        this.findCategory(this.incomingTransfers, this.categoriesCountIncoming, this.categoriesIn);
        this.toggle1 = true;
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = this.validateOutgoingTransfers(data);
      this.monthlyTransfers(this.outgoingTransfers, this.monthsOutgoing);
      this.findCategory(this.outgoingTransfers, this.categoriesCountOutgoing, this.categoriesOut);
      this.toggle2 = true;
      if (this.toggle1 && this.toggle2) {
        this.createChart();
      } else {
        window.location.reload();
      }
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
  }
private compareTwoArrays(a: any, b: any) {
    return JSON.stringify(a) != JSON.stringify(b);
}

  public monthlyTransfers(transfers : any, array : any) {
    for(let item of transfers) {
        let monthNumber = item.transfer_date.toString().substring(5, 7)-1;
        switch (monthNumber) {
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber)).getMonth(): (array)[0] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-1)).getMonth(): (array)[1] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-2)).getMonth(): (array)[2] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-3)).getMonth(): (array)[3] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-4)).getMonth(): (array)[4] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-5)).getMonth(): (array)[5] += item.transfer_amount;break;
          case new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-6)).getMonth(): (array)[6] += item.transfer_amount;break;
          default: break;
        }
    }
  }

  public findCategory(transfers : any, array : any, categories : any) {
    for(let i = 0; i < transfers.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (transfers[i].category === categories[j]) {
          array[j] += 1;
        }
      }
    }
  }

  toggleDisplay() {
    this.isHidden = !this.isHidden;
  }

  createChart() {
    this.chart = new Chart("baseChart", {
      type: 'bar',
      data: {
        labels: [
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-6)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-5)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-4)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-3)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-2)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-1)).getMonth()].toLowerCase(),
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber)).getMonth()].toLowerCase(),
        ],
        datasets: [
          {
            data: [this.monthsOutgoing[6], this.monthsOutgoing[5], this.monthsOutgoing[4], this.monthsOutgoing[3], this.monthsOutgoing[2], this.monthsOutgoing[1], this.monthsOutgoing[0]],
            label: 'Przelewy wychodzące (PLN)',
          },
          {
            data: [ this.monthsIncoming[6], this.monthsIncoming[5], this.monthsIncoming[4], this.monthsIncoming[3], this.monthsIncoming[2], this.monthsIncoming[1], this.monthsIncoming[0] ],
            label: 'Przelewy przychodzące (PLN)',
          }
        ]
      }
    });
    this.chartIncoming = new Chart("secondChart", {
      type: 'pie',
      data: {
        labels: [
          this.categoriesIn[0],
          this.categoriesIn[1],
          this.categoriesIn[2],
          this.categoriesIn[3],
          this.categoriesIn[4],
          this.categoriesIn[5],
          this.categoriesIn[6]
        ],
        datasets: [
          {
            data: [
              this.categoriesCountIncoming[0],
              this.categoriesCountIncoming[1],
              this.categoriesCountIncoming[2],
              this.categoriesCountIncoming[3],
              this.categoriesCountIncoming[4],
              this.categoriesCountIncoming[5],
              this.categoriesCountIncoming[6]
            ],
          }
        ]
      }
    });
    this.chartOutgoing = new Chart("thirdChart", {
      type: 'pie',
      data: {
        labels: [
          this.categoriesOut[0],
          this.categoriesOut[1],
          this.categoriesOut[2],
          this.categoriesOut[3],
          this.categoriesOut[4],
          this.categoriesOut[5],
          this.categoriesOut[6],
          this.categoriesOut[7],
          this.categoriesOut[8],
          this.categoriesOut[9],
          this.categoriesOut[10],
          this.categoriesOut[11],
          this.categoriesOut[12],
          this.categoriesOut[13],
          this.categoriesOut[14],
          this.categoriesOut[15],
          this.categoriesOut[16],
          this.categoriesOut[17],
          this.categoriesOut[18],
          this.categoriesOut[19],
          this.categoriesOut[20],
        ],
        datasets: [
          {
            data: [
              this.categoriesCountOutgoing[0],
              this.categoriesCountOutgoing[1],
              this.categoriesCountOutgoing[2],
              this.categoriesCountOutgoing[3],
              this.categoriesCountOutgoing[4],
              this.categoriesCountOutgoing[5],
              this.categoriesCountOutgoing[6],
              this.categoriesCountOutgoing[7],
              this.categoriesCountOutgoing[8],
              this.categoriesCountOutgoing[9],
              this.categoriesCountOutgoing[10],
              this.categoriesCountOutgoing[11],
              this.categoriesCountOutgoing[12],
              this.categoriesCountOutgoing[13],
              this.categoriesCountOutgoing[14],
              this.categoriesCountOutgoing[15],
              this.categoriesCountOutgoing[16],
              this.categoriesCountOutgoing[17],
              this.categoriesCountOutgoing[18],
              this.categoriesCountOutgoing[19],
              this.categoriesCountOutgoing[20]
            ],
          }
        ]
      }
    });
  }
}
