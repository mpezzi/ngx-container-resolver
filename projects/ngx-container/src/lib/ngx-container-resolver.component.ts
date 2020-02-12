import { Component, Input, TemplateRef } from '@angular/core';

import { ResolverChanges } from './interfaces';

@Component({
  selector: 'ngx-container-resolver',
  template: `
    <ng-container *ngIf="changes as c">
      <div class="ngx-container-resolver__debug" *ngIf="debug">
        <pre>{{ c | json }}</pre>
      </div>
      <div
        [class.ngx-container-resolver]="true"
        [class.ngx-container-resolver--success]="c.data"
        [class.ngx-container-resolver--failure]="c.error"
        [class.ngx-container-resolver--loading]="isLoading()"
        [class.ngx-container-resolver--reloading]="isReloading()"
      >
        <div class="ngx-container-resolver__reloading" *ngIf="isReloading() && reloadingPosition === 'above'">
          <ng-container
            *ngTemplateOutlet="reloading ? reloading : reloadingFallback; context: c"
          ></ng-container>
        </div>
        <div class="ngx-container-resolver__data" *ngIf="c.data">
          <ng-container
            *ngTemplateOutlet="data ? data : dataFallback; context: c"
          ></ng-container>
        </div>
        <div class="ngx-container-resolver__error" *ngIf="c.error">
          <ng-container
            *ngTemplateOutlet="error ? error : errorFallback; context: c"
          ></ng-container>
        </div>
        <div class="ngx-container-resolver__loading" *ngIf="isLoading()">
          <ng-container
            *ngTemplateOutlet="loading ? loading : loadingFallback; context: c"
          ></ng-container>
        </div>
        <div class="ngx-container-resolver__reloading" *ngIf="isReloading() && reloadingPosition === 'below'">
          <ng-container
            *ngTemplateOutlet="reloading ? reloading : reloadingFallback; context: c"
          ></ng-container>
        </div>
      </div>
      <ng-template #dataFallback>
        <pre>{{ c.data | json }}</pre>
      </ng-template>
      <ng-template #errorFallback>
        <pre>{{ c.error | json }}</pre>
      </ng-template>
      <ng-template #loadingFallback>
        {{ loadingLabel }}
      </ng-template>
      <ng-template #reloadingFallback>
        {{ reloadingLabel }}
      </ng-template>
    </ng-container>
  `
})
export class ContainerResolverComponent {
  /**
   * Holds changes.
   */
  @Input() changes: ResolverChanges<any>;

  /**
   * Holds data template ref.
   */
  @Input() data: TemplateRef<Element>;

  /**
   * Holds error template ref.
   */
  @Input() error: TemplateRef<Element>;

  /**
   * Holds loading template ref.
   */
  @Input() loading: TemplateRef<Element>;

  /**
   * Holds reloading template ref.
   */
  @Input() reloading: TemplateRef<Element>;

  /**
   * Holds loading label.
   */
  @Input() loadingLabel = 'Loading ...';

  /**
   * Holds reloading label.
   */
  @Input() reloadingLabel = 'Loading ...';

  /**
   * Holds reloading position.
   */
  @Input() reloadingPosition: 'above' | 'below' = 'below';

  /**
   * Holds debug.
   */
  @Input() debug = false;

  /**
   * Determine if resolver is loading.
   */
  public isLoading(): boolean {

    const { data, error, loading } = this.changes;

    return (!data && !error) && loading;

  }

  /**
   * Determine if resolver is reloading.
   */
  public isReloading(): boolean {

    const { data, error, loading } = this.changes;

    return (data || error) && loading;

  }
}
