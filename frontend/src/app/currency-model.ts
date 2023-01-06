export interface CurrencyModel {
  result : string;
  documentation : string,
  terms_of_use : string,
  time_last_update_unix : number,
  time_last_update_utc : string,
  time_next_update_unix : number,
  time_next_update_utc : string,
  base_code : string;
  conversion_rates : Map<string, number>;
}


//https://v6.exchangerate-api.com/v6/bd6916961f66b401213643f4/latest/USD
