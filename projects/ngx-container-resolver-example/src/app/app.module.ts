import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxContainerResolverModule } from 'projects/ngx-container-resolver/src/public-api';

import { AppComponent } from './app.component';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgxContainerResolverModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...components,
    ...containers,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
