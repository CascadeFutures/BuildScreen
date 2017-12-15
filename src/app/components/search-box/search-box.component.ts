import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pks-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Output() onSearch = new EventEmitter<string>();

  searchText: string;

  constructor() { }

  public searchClick() {
    this.onSearch.emit(this.searchText);
  }

}
