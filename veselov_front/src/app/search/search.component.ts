import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {Company} from '../interfaces/company.interface';
import {Worker} from '../interfaces/worker.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchInput: string;
  private companiesList: Company[];
  private workersList: {worker: Worker, company: string}[];
  constructor(public mainService: MainService, ) { }

  ngOnInit(): void {
    this.mainService.getCompanies();
    this.mainService.Companies$.subscribe((c: Company[]) => this.companiesList = c);
    this.workersList = [];
    for (const c of this.companiesList) {
      for (const w of c.workers) {
        this.workersList.push( {worker: w, company: c.name});
      }
    }
  }

  public FindCompanies() {
    if (!this.searchInput) {
      return [];
    }
    return this.companiesList.filter(item => item.name.includes(this.searchInput));
  }

  public FindWorkers(): {worker: Worker, company: string}[] {
    if (!this.searchInput) {
      return [];
    }
    return this.workersList.filter(item => item.worker.name.includes(this.searchInput));
  }

}
