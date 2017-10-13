import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { BuildInfo } from './models/buildInfo.model';
import { BuildType } from './models/buildType.model';
import { TeamCityService } from './services/team-city.service';


@Component({
  selector: 'pks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  builds: Array<BuildInfo>;
  private interval: any;

  constructor(private service: TeamCityService) {

  }

  ngOnInit() {
    this.builds = new Array<BuildInfo>();
    this.interval = setInterval(() => this.refresh(), 5000);
    this.refresh();
  }

  private refresh() {
    this.service.getBuild().then((data) => {
      data.forEach((build) => {
        if (this.builds.findIndex((obj) => obj.id === build.id) === -1) {
          this.builds.push(build);
        }
      });

      this.builds = this.applySort();
    });
  }


  private applySort() {
    console.log('****************************** sorted ******************************');
    return this.builds.sort((buildA, buildB) => {

      if (buildA.state === 'running' && buildB.state === 'running') {
        return +buildB.percentageComplete - +buildA.percentageComplete;
      }

      if (buildA.state === 'running' && buildB.state !== 'running') {
        return -1;
      }

      if (buildA.state !== 'running' && buildB.state === 'running') {
        return 1;
      }
      return +buildA.id - +buildB.id;
    });

  }

  private updateState(build: BuildInfo, state: string) {
    if (build) {
      build.state = state;
      this.builds = this.applySort();
    }
  }


}
