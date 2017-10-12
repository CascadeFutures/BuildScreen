import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {  TitleCasePipe} from './pipes/title-case.pipe';

import { AppComponent } from './app.component';
import { BuildCardComponent } from './components/build-card/build-card.component';



import { TeamCityService } from './services/team-city.service';

@NgModule({
  declarations: [
    AppComponent,
    BuildCardComponent,
    TitleCasePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TeamCityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
