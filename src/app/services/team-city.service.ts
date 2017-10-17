import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as _ from 'lodash';

import { Observable, } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/rx';

import { BuildInfo } from '../models/buildInfo.model';
import { BuildType } from '../models/buildType.model';

@Injectable()
export class TeamCityService {

  // apiBaseUrl = 'http://buildscreen/proxy-aspnet.ashx?url=http://tclive:8111/guestAuth/app/rest';
  // apiUrl = `${this.apiBaseUrl}/builds/branch:develop,running:any,canceled:any&ts=12:48:32%20GMT+0100%20(GMT%20Daylight%20Time)`;

  apiBaseUrl = 'http://localhost:3000?url=/guestAuth/app/rest/builds';

  testDataUrl = './assets/data.json';
  testTypesUrl = './assets/buildTypes.json';
  testBuildUrl = './assets/buildInfo.json';

  constructor(private http: HttpClient) { }

  public getBuild(): Promise<Array<BuildInfo>> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = { headers: headers };

    const url = `${this.apiBaseUrl}/?locator=running:any,branch:branched:any,count:1&ts=15:23:51%20GMT+0100%20(GMT%20Daylight`;

    return this.http.get(url)
      .map(data => {
        return JSON.parse(JSON.stringify(data)).build;
      })
      .map(builds => {
        return _.map(builds, (build) => {
          return new BuildInfo(
            build.id,
            '',
            build.number,
            build.status,
            build.state,
            build.running,
            build.percentageComplete,
          );
        });
      })
      .toPromise();
  }


  public getBuildByNumber(builId): Promise<BuildInfo> {

    const url = `${this.apiBaseUrl}/id:${builId}`;
    // const url = this.testBuildUrl;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = { headers: headers };

    return this.http.get(url)
      .map(data => JSON.parse(JSON.stringify(data)))
      .map(build => {

        return new BuildInfo(
          build.id,
          build.buildTypeId,
          build.number,
          build.status,
          build.state,
          build.running,
          build.percentageComplete,
          build.branchName,
          build.href,
          build.webUrl,
          build.buildType.name
        );
      })
      .toPromise();
  }
}
