import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchResponse } from './search.interface';
import { API_URL, ResponseItem } from '@document-library-search-system/Common';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = inject(API_URL);
  private baseUrl = `${this.apiUrl}/search`;
  
  private http = inject(HttpClient);


  searchExecute = (query: string, skip: number, limit: number): Observable<ResponseItem<SearchResponse>> => {
    return this.http.get<ResponseItem<SearchResponse>>(`${this.baseUrl}?query=${query}&skip=${skip}&limit=${limit}`)
  }

}
