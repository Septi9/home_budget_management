import { Component, OnInit } from '@angular/core';
import {CurrencyModel} from "../currency-model";
import {CurrencyService} from "../currency.service";
import countryData from "../../assets/json/country-code.json";

interface Country {
  currencyCode: string;
  countryCode: string;
}

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  currencyData? : CurrencyModel;
  countries: Country[] = countryData;
  selectedFrom : any = "PLN";
  usd : any = "USD";
  mostPopularNames : string[] = ["USD", "EUR", "GBP", "CHF"];
  mostPopularValues : number[] = [];
  a : number[] = [];
  map : Map<string, number> | undefined;
  finalValue: any = 1;
  type : any = 1;

  constructor(private currencyService : CurrencyService) { }

  ngOnInit(): void {
    console.log("init");
    this.getApi();
    console.log(this.a);
    console.log("out")
  }

  getApi() : void {
    this.currencyService.getData(this.selectedFrom).subscribe((currencyData) => {
      this.currencyData = currencyData;
      this.getCurrency(currencyData);
    });
  }

  getCurrency(currencyData : any) : number[] {
    if (currencyData != null) {
      this.map = new Map<string, number>(Object.entries(currencyData.conversion_rates));
      try {
        for (let i = 0; i < this.mostPopularNames.length; i++) {
          if ((this.map.get(this.mostPopularNames[i])!) != 0) {
            this.mostPopularValues[i] = Math.round((1/this.map.get(this.mostPopularNames[i])!) * 100) / 100;
          } else {
            this.mostPopularValues[i] = 0;
          }
        }
      } catch (e) {
        console.log("problem with map");
        throw(e);
      }
    }
    return this.mostPopularValues;
  }
}
