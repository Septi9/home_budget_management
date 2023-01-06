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
  option: any;
  countryFrom: any = "us";
  countryTo: any = "us";

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

  onSelectedFrom(value : string) : void {
    this.selectedFrom = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryFrom = country.countryCode.toLowerCase();
        this.getApi();
      }
    }
  }

  onSelectedTo(value : string) : void {
    this.selectedTo = value;
    for (let country of this.countries) {
      if (country.currencyCode === value) {
        this.countryTo = country.countryCode.toLowerCase();
      }
    }
  }
}
