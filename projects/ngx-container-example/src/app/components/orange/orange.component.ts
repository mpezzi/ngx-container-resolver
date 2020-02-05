import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orange',
  templateUrl: './orange.component.html',
  styleUrls: ['./orange.component.scss']
})
export class OrangeComponent {

  /**
   * Holds data.
   */
  @Input() data: any;

}
