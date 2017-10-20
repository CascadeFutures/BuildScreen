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

  apiBaseUrl = 'http://localhost:3001?url=/guestAuth/app/rest/builds';

  constructor(private http: HttpClient) { }

  public getBuild(): Promise<Array<BuildInfo>> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = { headers: headers };

    const url = `${this.apiBaseUrl}/?locator=running:any,branch:branched:any,count:12`;
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


  public getLastDevelopBuild(): Promise<BuildInfo> {

    const url = `${this.apiBaseUrl}?locator=branch:develop,running:any,canceled:any,buildType:bramley_PublishToStore,count:1`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = { headers: headers };

    return this.http.get(url)
      .map(data => {
        return JSON.parse(JSON.stringify(data)).build;
      })
      .map(builds => {
        return builds.length > 0 ? builds[0] : [];
      })
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
          build.webUrl
        );
      })
      .toPromise();
  }



  public getBuildsByBranch(branch: string): Promise<Array<BuildInfo>> {

    const url = `${this.apiBaseUrl}?locator=branch:${branch},running:any,canceled:any,count:10`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = { headers: headers };

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

}
