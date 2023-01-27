import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CryptoService} from "../crypto.service";
import {CryptoModel} from "../crypto-model.model";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  constructor(private cryptoService: CryptoService) { }

  cryptoModel: CryptoModel[] = [];
  searchText: string = '';
  enteredText: string = '';

  sortByName?: number = 0;
  sortByPrice?: number = 0;
  sortByMarketCap?: number = 0;
  sortByTotalVolume?: number = 0;
  sortBy24h?: number = 0;
  sortByNameContent?: string = "Sortuj od A";
  sortByPriceContent?: string = "Najwyższa cena";
  sortByMarketCapContent?: string = "Najniższy kurs";
  sortByTotalVolumeContent?: string = "Najwyższa wartość";
  sortBy24hContent?: string = "Najwyższy wzrost";

  ngOnInit(): void {
    this.cryptoService.getData().subscribe((cryptoModel) => this.cryptoModel = cryptoModel);
  }

  @Output()
  enteredTextChanged: EventEmitter<string> = new EventEmitter<string>();

  ngDoCheck(): void {

  }
  onEnteredTextChanged(searchValue: string) {
    this.searchText = searchValue;
  }

  nameAlphabetically(): number {
    if(this.sortByName == 0) {
      this.cryptoModel.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameContent = "Sortuj od Z"
      this.sortByName++;
      return 0;
    } else if(this.sortByName == 1) {
      this.cryptoModel.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameContent = "Domyślnie"
      this.sortByName++;
      return 0;
    } else if(this.sortByName == 2) {
      this.ngOnInit();
      this.sortByNameContent = "Sortuj od A"
      this.sortByName = 0;
      return 0;
    }
    return 0;
  }

  priceSort(): number {
    if(this.sortByMarketCap == 0) {
      this.cryptoModel.sort((a, b) => a.current_price < b.current_price ? 1 : -1);
      this.sortByPriceContent = "Najniższa cena";
      this.sortByMarketCap++;
      return 0;
    } else if(this.sortByMarketCap == 1) {
      this.cryptoModel.sort((a, b) => a.current_price > b.current_price ? 1 : -1);
      this.sortByPriceContent = "Domyślnie";
      this.sortByMarketCap++;
      return 0;
    } else if(this.sortByMarketCap == 2) {
      this.ngOnInit();
      this.sortByPriceContent = "Najwyższa cena";
      this.sortByMarketCap = 0;
      return 0;
    }
    return 0;
  }

  marketCapSort(): number {
    if(this.sortByPrice == 0) {
      this.cryptoModel.sort((a, b) => a.market_cap > b.market_cap ? 1 : -1);
      this.sortByMarketCapContent = "Najwyższy kurs";
      this.sortByPrice++;
      return 0;
    } else if(this.sortByPrice == 1) {
      this.ngOnInit();
      this.sortByMarketCapContent = "Najniższy kurs";
      this.sortByPrice = 0;
      return 0;
    }
    return 0;
  }

  totalVolumeSort(): number {
    if(this.sortByTotalVolume == 0) {
      this.cryptoModel.sort((a, b) => a.total_volume < b.total_volume ? 1 : -1);
      this.sortByTotalVolumeContent = "Najniższa wartość";
      this.sortByTotalVolume++;
      return 0;
    } else if(this.sortByTotalVolume == 1) {
      this.cryptoModel.sort((a, b) => a.total_volume > b.total_volume ? 1 : -1);
      this.sortByTotalVolumeContent = "Domyślnie";
      this.sortByTotalVolume++;
      return 0;
    } else if(this.sortByTotalVolume == 2) {
      this.ngOnInit();
      this.sortByTotalVolumeContent = "Najwyższa wartość";
      this.sortByTotalVolume = 0;
      return 0;
    }
    return 0;
  }

  dailySort(): number {
    if(this.sortBy24h == 0) {
      this.cryptoModel.sort((a, b) => a.price_change_percentage_24h < b.price_change_percentage_24h ? 1 : -1);
      this.sortBy24hContent = "Najniższy wzrost";
      this.sortBy24h++;
      return 0;
    } else if(this.sortBy24h == 1) {
      this.cryptoModel.sort((a, b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1);
      this.sortBy24hContent = "Domyślnie";
      this.sortBy24h++;
      return 0;
    } else if(this.sortBy24h == 2) {
      this.ngOnInit();
      this.sortBy24hContent = "Najwyższy wzrost";
      this.sortBy24h = 0;
      return 0;
    }
    return 0;
  }


}
