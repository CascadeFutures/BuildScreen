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

  buildsId: Array<string>;

  constructor(private service: TeamCityService) {

  }

  ngOnInit() {
    this.buildsId = new Array<string>();
    this.refresh();
  }

  private refresh() {
    // Promise.all([this.service.getBuild(), this.service.getBuildTypes()]).then(
    //   results => {
    //     const builds = results[0];
    //     const types = results[1];

    //     builds.forEach((build) => {
    //       const result = _.filter(types, function (type) { return type.id === build.buildTypeId; });
    //       if (result.length > 0) {
    //         build.buildType = result[0].name;
    //       }
    //     });

    //     this.totalBuilds = builds;
    //     this.buildTypes = types;

    //   });

    this.service.getBuild().then((data) => {
     data.forEach((id) => {
        if (this.buildsId.indexOf(id) === -1) {
          this.buildsId.push(id);
        }
      });
    });
  }


}
