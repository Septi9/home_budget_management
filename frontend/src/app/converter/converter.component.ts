import { Component, OnInit } from '@angular/core';
import countryData from '../../assets/json/country-code.json';
import {CurrencyService} from "../currency.service";
import {CurrencyModel} from "../currency-model";

interface Country {
  currencyCode: string;
  countryCode: string;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  countries: Country[] = countryData;
  selectedFrom : any = "USD";
  selectedTo : any = "USD";
  type : any = 1;
  finalValue: any = 1;
  option: any;
  countryFrom: any = "us";
  countryTo: any = "us";
  map : Map<string, number> | undefined;
  map2 = new Map([
    ['name', 'Tim'],
    ['country', 'Chile'],
  ]);
  element1: number | undefined = 0;
  element2: number | undefined = 0;

  constructor(private currencyService : CurrencyService) { }

  currencyData? : CurrencyModel;

  ngOnInit(): void {
    this.getApi();
  }

  getApi() : void {
    this.currencyService.getData(this.selectedFrom).subscribe((currencyData) => {
      this.currencyData = currencyData;
    });
  }

  getCurrency() : void {
    if (this.currencyData != null) {
      this.map = new Map<string, number>(Object.entries(this.currencyData.conversion_rates));
      try {
        this.finalValue = Math.round((this.type * this.map.get(this.selectedFrom)! * this.map.get(this.selectedTo)!) * 100) / 100;
      } catch (e) {
        console.log("problem with map")
      }
      console.log(this.map.get(this.selectedFrom));
      console.log(this.map.get(this.selectedTo));
    } else {
      console.log("hello")
    }
  }

  onType(value : any) {
    this.type = value;
    console.log(this.type)
  }

  onSelectedFrom(value : string) : void {
    this.selectedFrom = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryFrom = country.countryCode.toLowerCase();
        this.finalValue = 0;
        this.getApi();
      }
    }
  }

  onSelectedTo(value : string) : void {
    this.selectedTo = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryTo = country.countryCode.toLowerCase();
        this.finalValue = 0;
      }
    }
  }
}
