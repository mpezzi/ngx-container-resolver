import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-apple',
  templateUrl: './apple.component.html',
  styleUrls: ['./apple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppleComponent {

  /**
   * Holds data.
   */
  @Input() data: any;

}
