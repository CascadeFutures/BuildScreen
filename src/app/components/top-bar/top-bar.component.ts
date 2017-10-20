import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BuildInfo } from '../../models/buildInfo.model';

import { TeamCityService } from '../../services/team-city.service';

@Component({
  selector: 'pks-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public buildInfo: BuildInfo;

  @Output() onSearch = new EventEmitter<string>();

  constructor(private service: TeamCityService) {
    this.buildInfo = new BuildInfo();
  }

  ngOnInit() {
    setInterval(() => this.refresh(), 5000);
    this.refresh();
  }

  private refresh(): void {

    this.service.getLastDevelopBuild().then((payload) => {
      this.buildInfo = new BuildInfo(
        payload.id,
        payload.buildTypeId,
        payload.number,
        payload.status,
        payload.state,
        payload.running,
        payload.percentageComplete,
        payload.branchName,
        payload.href,
        payload.webUrl,
        payload.buildType
      );
    });
  }



  public isSuccess(): boolean {
    if (!this.buildInfo) { return false; }
    return this.buildInfo.status === 'SUCCESS' && this.buildInfo.state === 'finished';
  }

  public isFailure(): boolean {
    if (!this.buildInfo) { return false; }
    return this.buildInfo.status === 'FAILURE' && this.buildInfo.state === 'finished';
  }

  public isBuilding(): boolean {
    if (!this.buildInfo) { return false; }
    return this.buildInfo.state === 'running';
  }

  public isUnknown(): boolean {
    if (!this.buildInfo) { return false; }
    return this.buildInfo.status === 'UNKNOWN';
  }

  public getBuildStatus(): string {
    if (!this.buildInfo) { return ''; }
    if (this.isFailure()) { return 'Build FAILURE'; }
    if (this.isSuccess()) { return 'Build SUCCESS'; }
    if (this.isUnknown()) { return 'Status Unknown'; }
    if (this.isBuilding()) { return `Building ${this.getProgressPercentage()}`; }
  }

  public getProgressPercentage(): string {
    if (!this.buildInfo) { return ''; }
    return `${this.buildInfo.percentageComplete}%`;
  }

  public callback(event) {
    this.onSearch.emit(event);
  }


}
