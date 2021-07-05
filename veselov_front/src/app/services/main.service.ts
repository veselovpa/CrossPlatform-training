import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Worker} from '../interfaces/worker.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {Company} from '../interfaces/company.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class MainService {
  private header: any;
  private Companies$$: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  public Companies$: Observable<Company[]> = this.Companies$$.asObservable();

  constructor(public api: ApiService) {
  }

  private CreateHeader(): {headers: HttpHeaders} {
    return {headers: new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')}) };
  }

  public GetToken(user: any) {
    return this.api.post(`auth/token/`, user, {responseType: 'text'}).toPromise();
  }

  public getCompanies(): void {
    this.api.get('Companies').toPromise().then((companies: Company[]) => {
        this.Companies$$.next(companies);
      });
  }

  public PostCompany(item): void {
    this.api.post('Companies', item, this.CreateHeader()).toPromise().then((companies: Company[]) => {
      this.Companies$$.next(companies);
    });
  }

  public PostWorker(item, id): void {
    this.api.post(`Workers/${id}`, item, this.CreateHeader()).toPromise().then((companies: Company[]) => {
      this.Companies$$.next(companies);
    });
  }

  public DeleteCompany(id): void {
    this.api.delete(`Companies/${id}`, this.CreateHeader()).toPromise().then((companies: Company[]) => {
      this.Companies$$.next(companies);
    });
  }

  public DeleteWorker(id): void {
    this.api.delete(`Workers/${id}`, this.CreateHeader()).toPromise().then((companies: Company[]) => {
      this.Companies$$.next(companies);
    });
  }

  public PutCompany(item): void {
    this.api.put(`Companies/${item.id}`, item).toPromise().then((companies: Company[]) => {
      this.Companies$$.next(companies);
    });
  }
}
