import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerService, Resolver, ofInstance } from 'projects/ngx-container-resolver/src/public-api';
import { Subscription } from 'rxjs';

import { AppleAddedEvent, AppleRemovedEvent, OrangeAddedEvent, OrangeRemovedEvent } from '../../events';

interface OrangeContainerComponentData {
  value: number;
}

@Component({
  selector: 'app-orange-container',
  templateUrl: './orange-container.component.html',
  styleUrls: ['./orange-container.component.scss']
})
export class OrangeContainerComponent implements OnInit, OnDestroy {

  /**
   * Holds resolver.
   */
  public resolver: Resolver<OrangeContainerComponentData>;

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

    this.resolver = this.container.createResolver<OrangeContainerComponentData>((args: any = {}) => {

      return new Promise((resolve, reject) => {

        setTimeout(() => {

          const value = Math.random();

          if (value > 0.25) {
            resolve({ ...args, value });
          } else {
            reject({ value });
          }

        }, 2000);

      });

    });

    this.events = this.container.events.pipe(
      ofInstance(
        OrangeAddedEvent,
        OrangeRemovedEvent,
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

    this.events.unsubscribe();
    this.resolver.unsubscribe();

  }

  /**
   * Reload.
   */
  public reload(): void {

    this.resolver.load();

  }

  /**
   * Add Apple.
   */
  public addApple(): void {

    this.container.emit(new AppleAddedEvent({ data: 'addApple' }));

  }

  /**
   * Remove Apple.
   */
  public removeApple(): void {

    this.container.emit(new AppleRemovedEvent({ data: 'removeApple' }));

  }

}
