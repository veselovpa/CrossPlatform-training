import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {Company} from '../interfaces/company.interface';
import {Worker} from '../interfaces/worker.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public companyView: boolean;
  public companiesList: Company[];
  public select: string;
  public nameInput: string;
  public yearInput: string;
  constructor(public mainService: MainService, ) { }

  ngOnInit(): void {
    this.companyView = true;
    document.getElementById('toggle-company').style.backgroundColor = '#717d9a';
    this.mainService.Companies$.subscribe((c: Company[]) => this.companiesList = c);
    this.mainService.getCompanies();
  }

  public ToggleCompany() {
    this.nameInput = '';
    this.companyView = true;
    document.getElementById('toggle-company').style.backgroundColor = '#717d9a';
    document.getElementById('toggle-worker').style.backgroundColor = '#5d6679';
  }

  public ToggleWorker() {
    this.nameInput = '';
    this.companyView = false;
    document.getElementById('toggle-worker').style.backgroundColor = '#717d9a';
    document.getElementById('toggle-company').style.backgroundColor = '#5d6679';
  }

  private AddCompany() {
    this.mainService.PostCompany({name: this.nameInput, workers: []});
  }

  private AddWorker() {
    this.mainService.PostWorker({name: this.nameInput, yearsExperience: parseInt(this.yearInput, 10)}, this.select);
  }

  public AddElement() {
    if (localStorage.getItem('login') !== 'admin') {
      alert('Для этого действия вы должны войти как admin');
      return;
    }
    if (this.companyView) {
      this.AddCompany();
    }
    else {
      this.AddWorker();
    }
  }
}
