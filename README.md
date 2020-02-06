# ngx-container

[![Build Status](https://travis-ci.org/mpezzi/ngx-container.svg?branch=master)](https://travis-ci.org/mpezzi/ngx-container)

A container library for Angular for handling loading of asynchronous data into components.

_Note: This is a proof-of-concept library at this point and is not recommended for production._

## Installation

```
npm install ngx-container --save
```

## Usage

Add `NgxContainerModule.forRoot()` to your AppModule imports

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxContainerModule } from 'ngx-container';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgxContainerModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Inject the `ContainerService` into your container components, create a new resolver, and pass the `resolver.changes` observable to `<ngx-container [changes]="resolver.changes | async"></ngx-container>` component. This will handle displaying the loaded, error, and loading states in your component. You can override the default templates provided by the components.

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Resolver, ContainerService, ofInstance } from 'ngx-container';
import { TodoAdded, TodoRemoved, TodoReload } from '../events';

@Component({
  selector: 'my-container',
  template: `
    <button (click)="reload()">
      Reload
    </button>
    <ngx-container-resolver [changes]="resolver.changes | async" [data]="data" [error]="error">
      <ng-template #data let-data="data">
        <app-todo-list [todos]="data"></app-todo-list>
      </ng-template>
      <ng-template #error let-error="error">
        There was an error: {{ error.message }}
      </ng-template>
    </ngx-container-resolver>
  `,
})
export class MyContainerComponent implements OnInit, OnDestroy {

  /**
   * Holds resolver.
   */
  public resolver: Resolver<MyContainerComponentData>;

  /**
   * Holds events subscription.
   */
  public events: Subscription;

  /**
   * Constructor.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly container: ContainerService,
  ) { }

  /**
   * On Init.
   */
  public ngOnInit(): void {

    this.resolver = this.container.createResolver<MyContainerComponentData>(
      (params: any = {}) => this.http.get('/todos', { params }),
    );

    this.events = this.container.events.pipe(
      ofInstance(
        TodoAdded,
        TodoRemoved,
        TodoReload,
      ),
    ).subscribe(
      event => this.resolver.load({ query: 'param' }),
    );

    this.resolver.load();

  }

  /**
   * On Destroy.
   */
  public ngOnDestroy(): void {

    this.events.unsubscribe();
    this.resolver.unsubscribe();

  }

  /**
   * Reload.
   */
  public reload(): Promise<MyContainerComponentData> {

    return this.resolver.load();

  }

}
```

Use the `ContainerService` to reload resolvers from other container components or services

```typescript
import { Component } from '@angular/core';
import { ContainerService } from 'ngx-container';
import { TodoReload } from '../events';

@Component({
  selector: 'my-other-container',
  template: `
    <button (click)="reload()">
      Reload
    </button>
  `,
})
export class MyOtherContainerComponent {

  /**
   * Constructor.
   */
  public constructor(
    private readonly container: ContainerService,
  ) { }

  /**
   * Reload.
   */
  public reload(): void {

    this.container.emit(new TodoReload());

  }

}
```
