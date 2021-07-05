import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { MainService } from './services/main.service';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import {Routes, RouterModule} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add', component: AddComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    AuthComponent,
    AddComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    MainService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
