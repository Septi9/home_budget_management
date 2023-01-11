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
  monthsIncoming : number[] = [0, 0, 0, 0, 0, 0, 0];
  monthsOutgoing : number[] = [0, 0, 0, 0, 0, 0, 0];

  constructor(private _service : RegistrationService) {}

  ngOnInit(): void {
    this.sessionValue = sessionStorage.getItem('email');
    this.getIncomingTransfers();
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

  private getIncomingTransfers() {
    this._service.getIncomingTransfersList().subscribe(data => {
        this.incomingTransfers = this.validateIncomingTransfers(data);
        this.monthlyTransfers(this.incomingTransfers, this.monthsIncoming);
      },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
    this._service.getOutgoingTransfersList().subscribe(data => {
      this.outgoingTransfers = this.validateOutgoingTransfers(data);
      this.monthlyTransfers(this.outgoingTransfers, this.monthsOutgoing);
        this.createChart();
    },
      error => {
        console.log("not working");
        this.msg = error.error;
        console.log(error)
      });
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
  }
}
