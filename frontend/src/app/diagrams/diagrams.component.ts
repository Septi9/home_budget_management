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
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
  categories = [
    "Entertainment", "Transport", "Finances", "Health and Beauty", "Home and Bills",
    "Basic Expenses", "Food", "Others"
  ];
  categoriesCountIncoming : number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  categoriesCountOutgoing : number[] = [0, 0, 0, 0, 0, 0, 0, 0];
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
        this.findCategory(this.incomingTransfers, this.categoriesCountIncoming);
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
      this.findCategory(this.outgoingTransfers, this.categoriesCountOutgoing);
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

  public findCategory(transfers : any, array : any) {
    for(let i = 0; i < transfers.length; i++) {
      for (let j = 0; j < this.categories.length; j++) {
        if (transfers[i].category === this.categories[j]) {
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
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-6)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-5)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-4)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-3)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-2)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber-1)).getMonth()],
          this.monthNames[new Date(new Date().setMonth(new Date().getMonth() + this.monthNumber)).getMonth()],
        ],
        datasets: [
          {
            data: [this.monthsOutgoing[6], this.monthsOutgoing[5], this.monthsOutgoing[4], this.monthsOutgoing[3], this.monthsOutgoing[2], this.monthsOutgoing[1], this.monthsOutgoing[0]],
            label: 'Outgoing Transfers',
          },
          {
            data: [ this.monthsIncoming[6], this.monthsIncoming[5], this.monthsIncoming[4], this.monthsIncoming[3], this.monthsIncoming[2], this.monthsIncoming[1], this.monthsIncoming[0] ],
            label: 'Incoming Transfers',
          }
        ]
      }
    });
    this.chartIncoming = new Chart("secondChart", {
      type: 'pie',
      data: {
        labels: [
          this.categories[0],
          this.categories[1],
          this.categories[2],
          this.categories[3],
          this.categories[4],
          this.categories[5],
          this.categories[6],
          this.categories[7],
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
              this.categoriesCountIncoming[6],
              this.categoriesCountIncoming[7],
            ],
          }
        ]
      }
    });
    this.chartOutgoing = new Chart("thirdChart", {
      type: 'pie',
      data: {
        labels: [
          this.categories[0],
          this.categories[1],
          this.categories[2],
          this.categories[3],
          this.categories[4],
          this.categories[5],
          this.categories[6],
          this.categories[7],
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
            ],
          }
        ]
      }
    });
  }
}
