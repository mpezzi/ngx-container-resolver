import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ContainerEventBusService } from './ngx-container-event-bus.service';
import { ContainerResolverComponent } from './ngx-container-resolver.component';
import { ContainerService } from './ngx-container.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ContainerResolverComponent,
  ],
  declarations: [
    ContainerResolverComponent,
  ],
})
export class NgxContainerModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxContainerModule,
      providers: [
        ContainerService,
        ContainerEventBusService,
      ],
    };
  }

}
