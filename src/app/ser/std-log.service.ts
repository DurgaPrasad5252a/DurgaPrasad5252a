import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Details } from '../details';

@Injectable({
  providedIn: 'root',
})
export class StdLogService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/students';
  getDetails() {
    return this.http.get<Details[]>(this.url);
  }
}
