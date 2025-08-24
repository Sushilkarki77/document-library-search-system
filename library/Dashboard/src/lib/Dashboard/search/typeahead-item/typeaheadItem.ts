import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ResultItem } from '../services/search.interface';

@Component({
  selector: 'lib-typeahead-item',
  imports: [MatIcon],
  templateUrl: './typeaheadItem.html',
  styleUrl: './typeaheadItem.css',
})
export class TypeaheadItem {

  item = input.required<ResultItem>();

  

}
