import {
  Component,
  Input,
  SimpleChanges, OnChanges
} from '@angular/core';

@Component({
  selector: 'pks-responsive-text',
  templateUrl: './responsive-text.component.html',
  styleUrls: ['./responsive-text.component.scss']
})
export class ResponsiveTextComponent implements OnChanges {

  @Input() ratio: number;
  @Input() referenceSize = 0;

  public fontSize: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const refSize = changes.referenceSize !== undefined ? changes.referenceSize.currentValue : this.referenceSize;
    const multiple = changes.ratio !== undefined ? changes.ratio.currentValue : this.ratio;
    this.fontSize = `${refSize * multiple}px`;
    console.log('changes');
  }




}
