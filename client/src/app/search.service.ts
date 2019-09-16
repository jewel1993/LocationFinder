import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) { }
public search(search: string) {
  const data = {search};
  this.http.post(BACKEND_URL + 'getAddress' , data);
}

}
