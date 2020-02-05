import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerService, Resolver, ofInstance } from 'projects/ngx-container/src/public-api';
import { Subscription } from 'rxjs';

import { AppleAddedEvent, AppleRemovedEvent, OrangeAddedEvent, OrangeRemovedEvent } from '../../events';

interface AppleContainerComponentData {
  value: number;
}

@Component({
  selector: 'app-apple-container',
  templateUrl: './apple-container.component.html',
  styleUrls: ['./apple-container.component.scss']
})
export class AppleContainerComponent implements OnInit, OnDestroy {

  /**
   * Holds resolver.
   */
  public resolver: Resolver<AppleContainerComponentData>;

  /**
   * Holds events.
   */
  public events: Subscription;

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

    this.resolver = this.container.createResolver<AppleContainerComponentData>((args: any = {}) => {

      return new Promise((resolve, reject) => {

        setTimeout(() => {

          const value = Math.random();

          if (value > 0.25) {
            resolve({ ...args, value });
          } else {
            reject({ value });
          }

        }, 1000);

      });

    });

    this.events = this.container.events.pipe(
      ofInstance(
        AppleAddedEvent,
        AppleRemovedEvent,
      ),
    ).subscribe(
      e => this.resolver.load(e.payload)
    );

    this.resolver.load();

  }

  /**
   * Destroy.
   */
  public ngOnDestroy(): void {

    this.resolver.unsubscribe();
    this.events.unsubscribe();

  }

  /**
   * Reload.
   */
  public reload(): void {

    this.resolver.load();

  }

  /**
   * Add orange.
   */
  public addOrange(): void {

    this.container.emit(new OrangeAddedEvent({ data: 'addOrange' }));

  }

  /**
   * Remove orange.
   */
  public removeOrange(): void {

    this.container.emit(new OrangeRemovedEvent({ data: 'removeOrange' }));

  }

}
