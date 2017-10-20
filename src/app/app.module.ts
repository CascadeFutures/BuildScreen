import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TitleCasePipe } from './pipes/title-case.pipe';

import { TeamCityService } from './services/team-city.service';
import { ResizeService } from './services/resize/resize.service';

import { AppComponent } from './app.component';
import { BuildCardComponent } from './components/build-card/build-card.component';
import { ResponsiveTextComponent } from './components/responsive-text/responsive-text.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    BuildCardComponent,
    TitleCasePipe,
    ResponsiveTextComponent,
    TopBarComponent,
    SearchBoxComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    TeamCityService,
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
