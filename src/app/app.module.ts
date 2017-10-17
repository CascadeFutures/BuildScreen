import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleCasePipe } from './pipes/title-case.pipe';

import { TeamCityService } from './services/team-city.service';
import { ResizeService } from './services/resize/resize.service';

import { AppComponent } from './app.component';
import { BuildCardComponent } from './components/build-card/build-card.component';
import { ResponsiveTextComponent } from './components/responsive-text/responsive-text.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildCardComponent,
    TitleCasePipe,
    ResponsiveTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    TeamCityService,
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
