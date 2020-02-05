import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerEventBusService, NgxContainerModule } from 'projects/ngx-container/src/public-api';

import { AppComponent } from './app.component';
import { components } from './components';
import { containers } from './containers';
import { EventBusService } from './services/event-bus.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgxContainerModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...components,
    ...containers,
  ],
  providers: [
    EventBusService,
    {
      provide: ContainerEventBusService,
      useExisting: EventBusService,
    }
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
