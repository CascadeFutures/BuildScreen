import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BuildInfo } from '../../models/buildInfo.model';

import { TeamCityService } from '../../services/team-city.service';

@Component({
  selector: 'pks-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.scss']
})
export class BuildCardComponent implements OnInit {

  @Input() buildId: string;
  @Output() onState = new EventEmitter<string>();

  private interval: any;

  public buildInfo: BuildInfo;
  public val: number;

  constructor(private service: TeamCityService) {
    this.buildInfo = new BuildInfo();
    this.val = Math.random() * 100;
  }

  ngOnInit() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 5000);
    console.log('changed');
  }

  private refresh(): void {
    this.service.getBuildByNumber(this.buildId).then((payload) => {

      if (this.buildInfo && this.buildInfo.id === payload.id) {
        this.buildInfo = Object.assign(this.buildInfo,
          {
            status: payload.status,
            state: payload.state,
            running: payload.running,
            percentageComplete: payload.percentageComplete
          });
      } else {
        this.buildInfo = new BuildInfo(
          payload.id,
          payload.buildTypeId,
          payload.number,
          payload.status,
          payload.state,
          payload.running,
          // '' + Math.floor(Math.random() * 100),
          payload.percentageComplete,
          payload.branchName,
          payload.href,
          payload.webUrl,
          payload.buildType
        );
      }

      this.onState.emit(this.buildInfo.state);

      if (!this.isBuilding()) {
        clearInterval(this.interval);
      }

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

  public getBuildStatus(): string {
    if (!this.buildInfo) { return ''; }
    if (this.isFailure()) { return 'FAILURE'; }
    if (this.isSuccess()) { return 'SUCCESS'; }
    if (this.isBuilding()) { return `Building ${this.getProgressPercentage()}`; }
  }

  public getProgressPercentage(): string {
    if (!this.buildInfo) { return ''; }
    return `${this.buildInfo.percentageComplete}%`;
  }



}
