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
  selectedFrom : any = "PLN";
  selectedTo : any = "PLN";
  type : any = `${1}.00`;
  finalValue: any = `${1}.00`;
  option: any;
  countryFrom: any = "pl";
  countryTo: any = "pl";
  map : Map<string, number> | undefined;

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
        if (!this.finalValue.toString().includes('.')) {
          this.finalValue = `${this.finalValue}.00`;
        }
      } catch (e) {
        console.log("problem with map")
      }
    }
  }

  onType(value : any) {
    if (!value.includes('.')) {
      value = `${value}.00`;
    }
    this.type = value;
    console.log("change")
  }

  onSelectedFrom(value : string) : void {
    this.selectedFrom = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryFrom = country.countryCode.toLowerCase();
        this.finalValue = `${0}.00`;
        this.getApi();
      }
    }
  }

  onSelectedTo(value : string) : void {
    this.selectedTo = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryTo = country.countryCode.toLowerCase();
        this.finalValue = `${0}.00`;
      }
    }
  }
}
