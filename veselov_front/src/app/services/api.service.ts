import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ApiService {

  public environment = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient,
  ) {
  }

  public get<T>(url: string, head: any = {}): Observable<any> {
    return this.http.get(`${this.environment}${url}`, head);
  }

  public post<T>(url: string, body: any, head: any = {}): Observable<any> {
    return this.http.post(`${this.environment}${url}`, body, head);
  }

  public delete<T>(url: string, head: any = {}): Observable<any> {
    return this.http.delete(`${this.environment}${url}`, head);
  }

  public put<T>(url: string, body: any): Observable<any> {
    return this.http.put(`${this.environment}${url}`, body);
  }
}
