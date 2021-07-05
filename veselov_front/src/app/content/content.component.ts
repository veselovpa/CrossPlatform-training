import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {Company} from '../interfaces/company.interface';
import {Worker} from '../interfaces/worker.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public companiesList: {comp: Company, view: boolean}[] = [];
  public editSave = 'edit';
  constructor(private mainService: MainService, ) { }

  ngOnInit(): void {
     this.mainService.Companies$.subscribe((c: Company[]) => {
       this.companiesList = [];
       for (const i of c) {
         this.companiesList.push( { comp: i, view: false } );
       }
     });
     this.mainService.getCompanies();
  }

  ChooseCompany(item: any): void {
    item.view = !item.view;
  }

  DeleteCompany(item: Company, event): void {
    event.stopPropagation();
    if (localStorage.getItem('login') !== 'admin') {
      alert('Для этого действиятп вы должны войти как admin');
      return;
    }
    this.mainService.DeleteCompany(item.id);
  }

  DeleteWorker(item: Worker): void {
    if (localStorage.getItem('login') !== 'admin') {
      alert('Для этого действия вы должны войти как admin');
      return;
    }
    this.mainService.DeleteWorker(item.id);
  }

  RenameCompany(input): void {
    input.style.border = 'solid 2px #363636';
    input.style.margin = '-2px';
    input.style.paddingLeft = '10px';
    this.editSave = 'save';
  }

  SaveCompany(item: Company, input): void {
    input.style.border = 'none';
    input.style.margin = '0';
    input.style.paddingLeft = '0';
    this.editSave = 'edit';
    item.name = input.value;
    // this.companiesList = [];
    this.mainService.PutCompany(item);
  }

  EditCompany(item: Company, event): void {
    event.stopPropagation();
    if (!localStorage.getItem('login')) {
      alert('Для этого действия вы должны авторизироваться');
      return;
    }
    const currentInput = document.getElementById(`input${item.id}`) as HTMLInputElement;
    if (currentInput.disabled) {
      this.RenameCompany(currentInput);
    }
    else {
      this.SaveCompany(item, currentInput);
    }
    currentInput.disabled = !currentInput.disabled;
  }

}
