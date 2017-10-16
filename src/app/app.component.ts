import { Component, OnInit, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

import * as _ from 'lodash';

import { BuildInfo } from './models/buildInfo.model';
import { BuildType } from './models/buildType.model';
import { TeamCityService } from './services/team-city.service';

@Component({
  selector: 'pks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('indexChange', [
      // transition('void => *', [
      //   style({ opacity: '0.25', paddingLeft: '0px', paddingRight: '0px' }),
      //   group([
      //     animate('0.75s ease', style({ opacity: '1' })),
      //     animate('1s ease', style({ paddingLeft: '*', paddingRight: '*' }))
      //   ])
      // ]
      // ),
      transition('* => *', [
        style({ opacity: '1' }),
        // group([
        //   animate('0.75s ease', style({ opacity: '0.65' })),
        //   animate('0.1s 0.1s ease', style({ opacity: '1' }))
        // ])
        animate(1000,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 0.5 }),
            style({ opacity: 1, offset: 1 })
          ]))
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {

  builds: Array<BuildInfo>;
  private interval: any;

  constructor(private service: TeamCityService, private _el: ElementRef) {
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

  private onChange(build: BuildInfo) {

    if (build !== undefined) {

      const result = _.find(this.builds, (element) => element.id === build.id);

      if (result !== undefined) {
        result.state = build.state;
        result.percentageComplete = build.percentageComplete;
      }

      this.builds = this.applySort();
    }
  }



}
