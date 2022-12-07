import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteredText: string = '';

  @Output()
  enteredTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onEnteredTextChanged() {
    this.enteredTextChanged.emit(this.enteredText);
  }
}
