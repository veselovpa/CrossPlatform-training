import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public login = '';
  public password = '';
  public tittle: string;
  public isLogged: boolean;

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('login')) {
      this.tittle = 'Введите логин и пароль:';
      this.isLogged = false;
    }
    else {
      this.tittle = `Вы вошли как ${localStorage.getItem('login')}`;
      this.isLogged = true;
    }
  }

  public ButtonCheck() {
    return !(this.login && this.password);
  }

  public LogIn() {
    this.mainService.GetToken({login: this.login, password: this.password}).then( (token: any) => {
      localStorage.setItem('token', token);
      if (token) {
        this.tittle = `Вы вошли как ${this.login}`;
        localStorage.setItem('login', this.login);
        this.isLogged = true;
      }
      else {
        this.tittle = 'Неправильный логин или пароль';
      }
    });
  }

  public LogOut() {
    this.tittle = 'Введите логин и пароль:';
    this.isLogged = false;
    localStorage.clear();
  }


}
