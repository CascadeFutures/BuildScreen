import {
  Component,
  OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { BuildInfo } from '../../models/buildInfo.model';

import { TeamCityService } from '../../services/team-city.service';
import { ResizeService } from '../../services/resize/resize.service';

@Component({
  selector: 'pks-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.scss'],

})
export class BuildCardComponent implements OnInit, OnDestroy {

  @Input() buildId: string;
  @Output() onChange = new EventEmitter<BuildInfo>();

  private interval: any;

  public buildInfo: BuildInfo;

  selfWidth: number;

  private resizeTimeout: any;

  constructor(private service: TeamCityService,
    private el: ElementRef,
    private resizeService: ResizeService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.buildInfo = new BuildInfo();
    this.selfWidth = 0;
  }

  ngOnInit() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 5000);
    this.setEvent();
  }


  ngOnDestroy() {
    this.resizeService.removeResizeEventListener(this.el.nativeElement);
  }


  private setEvent() {
    this.resizeService.addResizeEventListener(this.el.nativeElement, (elem) => {
      clearInterval(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        console.log('resize');
        this.selfWidth = this.el.nativeElement.offsetWidth;
        this.changeDetectorRef.detectChanges();
      }, 500);
    });
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

      this.onChange.emit(this.buildInfo);

      if (!this.isBuilding()) {
        clearInterval(this.interval);
        this.buildInfo.state = 'finished';
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
