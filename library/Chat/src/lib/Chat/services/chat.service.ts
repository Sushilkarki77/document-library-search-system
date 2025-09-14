import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { API_URL, ResponseItem } from '@document-library-search-system/Common';

export interface ChatResponse {
  answer: string,
}


@Injectable({
  providedIn: 'root'
})
export class Chatservice {

  private apiUrl = inject(API_URL);
  private baseUrl = `${this.apiUrl}/chat`;
  
  private http = inject(HttpClient);


  chatExecute = (query: string): Observable<ResponseItem<ChatResponse>> => {
    return this.http.get<ResponseItem<ChatResponse>>(`${this.baseUrl}?query=${query}`)
  }

}
