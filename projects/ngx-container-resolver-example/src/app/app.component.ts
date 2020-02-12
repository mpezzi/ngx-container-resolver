import { Component, OnInit } from '@angular/core';
import { ContainerChanges, ContainerService } from 'projects/ngx-container-resolver/src/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Holds changes.
   */
  public changes: Observable<ContainerChanges>;

  /**
   * Constructor.
   */
  public constructor(
    private readonly container: ContainerService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.changes = this.container.changes;

  }

}
