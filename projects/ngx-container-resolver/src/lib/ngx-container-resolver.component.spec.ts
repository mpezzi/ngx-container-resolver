import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResolverChanges } from './interfaces';
import { ContainerResolverComponent } from './ngx-container-resolver.component';

describe('ContainerResolverComponent', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  const el = <T>(fix: ComponentFixture<T>, selector: string): DebugElement => (
    fix.debugElement.query(By.css(selector))
  );

  enum ClassElement {
    Container = '.ngx-container-resolver',
    Data = '.ngx-container-resolver__data',
    Error = '.ngx-container-resolver__error',
    Loading = '.ngx-container-resolver__loading',
    Reloading = '.ngx-container-resolver__reloading',
    Debug = '.ngx-container-resolver__debug',
  }

  enum ClassModifier {
    Success = 'ngx-container-resolver--success',
    Failure = 'ngx-container-resolver--failure',
    Loading = 'ngx-container-resolver--loading',
    Reloading = 'ngx-container-resolver--reloading',
  }

  @Component({
    template: `
      <ngx-container-resolver
        [changes]="changes"
        [data]="overrideDataTemplate ? data : null"
        [error]="overrideErrorTemplate ? error : null"
        [loading]="overrideLoadingTemplate ? loading : null"
        [reloading]="overrideReloadingTemplate ? reloading : null"
        [loadingLabel]="loadingLabel"
        [reloadingLabel]="reloadingLabel"
        [reloadingPosition]="reloadingPosition"
        [debug]="debug"
      >
        <ng-template #data let-data="data">
          The data is: {{ data.message }}
        </ng-template>
        <ng-template #error let-error="error">
          The error is: {{ error.message }}
        </ng-template>
        <ng-template #loading>
          Loading Override ...
        </ng-template>
        <ng-template #reloading>
          Reloading Override ...
        </ng-template>
      </ngx-container-resolver>
    `
  })
  class HostComponent {
    @Input() overrideDataTemplate = true;
    @Input() overrideErrorTemplate = true;
    @Input() overrideLoadingTemplate = true;
    @Input() overrideReloadingTemplate = true;
    @Input() changes: ResolverChanges<any>;
    @Input() loadingLabel: string;
    @Input() reloadingLabel: string;
    @Input() reloadingPosition: 'above' | 'below' = 'below';
    @Input() debug: boolean;
  }

  beforeEach(async(() => {

    TestBed
      .configureTestingModule({
        declarations: [
          HostComponent,
          ContainerResolverComponent,
        ],
      })
      .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

  });

  describe('data', () => {

    it('should display data', () => {

      component.changes = {
        data: {
          message: 'test',
        },
        error: null,
        loading: false,
      };

      component.overrideDataTemplate = true;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Data).nativeElement.textContent.trim())
        .toEqual('The data is: test');
      expect(el(fixture, ClassElement.Error))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Loading))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Reloading))
        .toBeFalsy();

      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

    it('should display data default', () => {

      component.changes = {
        data: {
          message: 'test',
        },
        error: null,
        loading: false,
      };

      component.overrideDataTemplate = false;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Data).nativeElement.textContent)
        .toContain(JSON.stringify(component.changes.data, null, 2));
      expect(el(fixture, ClassElement.Error))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Loading))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Reloading))
        .toBeFalsy();

      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

  });

  describe('error', () => {

    it('should display error', () => {

      component.changes = {
        data: null,
        error: {
          message: 'test',
        },
        loading: false,
      };

      component.overrideErrorTemplate = true;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Error))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Error).nativeElement.textContent.trim())
        .toEqual('The error is: test');
      expect(el(fixture, ClassElement.Loading))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Reloading))
        .toBeFalsy();

      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

    it('should display error default', () => {

      component.changes = {
        data: null,
        error: {
          message: 'test',
        },
        loading: false,
      };

      component.overrideErrorTemplate = false;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Error))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Error).nativeElement.textContent)
        .toContain(JSON.stringify(component.changes.error, null, 2));
      expect(el(fixture, ClassElement.Loading))
        .toBeFalsy();
      expect(el(fixture, ClassElement.Reloading))
        .toBeFalsy();

      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

  });

  describe('loading', () => {

    it('should display loader', () => {

      component.changes = {
        data: null,
        error: null,
        loading: true,
      };

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data)).toBeFalsy();
      expect(el(fixture, ClassElement.Error)).toBeFalsy();
      expect(el(fixture, ClassElement.Reloading)).toBeFalsy();

      expect(el(fixture, ClassElement.Loading))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Loading).nativeElement.textContent)
        .toContain('Loading Override ...');

      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

    it('should display loader default', () => {

      component.changes = {
        data: null,
        error: null,
        loading: true,
      };

      component.loadingLabel = 'Loading Label Override ...';
      component.overrideLoadingTemplate = false;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data)).toBeFalsy();
      expect(el(fixture, ClassElement.Error)).toBeFalsy();
      expect(el(fixture, ClassElement.Reloading)).toBeFalsy();

      expect(el(fixture, ClassElement.Loading))
        .toBeTruthy();
      expect(el(fixture, ClassElement.Loading).nativeElement.textContent)
        .toContain(component.loadingLabel);

      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Reloading);

    });

  });

  describe('reloading', () => {

    it('should display reloader', () => {

      component.changes = {
        data: true,
        error: null,
        loading: true,
      };

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data)).toBeTruthy();
      expect(el(fixture, ClassElement.Error)).toBeFalsy();
      expect(el(fixture, ClassElement.Loading)).toBeFalsy();
      expect(el(fixture, ClassElement.Reloading)).toBeTruthy();
      expect(el(fixture, ClassElement.Reloading).nativeElement.textContent)
        .toContain('Reloading Override ...');

      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Reloading);

    });

    it('should display reloader default', () => {

      component.changes = {
        data: true,
        error: null,
        loading: true,
      };

      component.reloadingLabel = 'Reloading Label Override ...';
      component.overrideReloadingTemplate = false;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data)).toBeTruthy();
      expect(el(fixture, ClassElement.Error)).toBeFalsy();
      expect(el(fixture, ClassElement.Loading)).toBeFalsy();
      expect(el(fixture, ClassElement.Reloading)).toBeTruthy();
      expect(el(fixture, ClassElement.Reloading).nativeElement.textContent)
        .toContain(component.reloadingLabel);

      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Reloading);

    });

    it('should display reloader with error', () => {

      component.changes = {
        data: null,
        error: true,
        loading: true,
      };

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Data)).toBeFalsy();
      expect(el(fixture, ClassElement.Error)).toBeTruthy();
      expect(el(fixture, ClassElement.Loading)).toBeFalsy();
      expect(el(fixture, ClassElement.Reloading)).toBeTruthy();
      expect(el(fixture, ClassElement.Reloading).nativeElement.textContent)
        .toContain('Reloading Override ...');

      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Success);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Failure);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .not.toHaveClass(ClassModifier.Loading);
      expect(el(fixture, ClassElement.Container).nativeElement)
        .toHaveClass(ClassModifier.Reloading);

    });

    it('should display reloader at above position', () => {

      component.changes = {
        data: true,
        error: null,
        loading: true,
      };

      component.reloadingPosition = 'above';

      fixture.detectChanges();

      const children = el(fixture, ClassElement.Container).queryAll(By.css('div'));

      expect(children[0]).toBe(el(fixture, ClassElement.Reloading));
      expect(children[1]).toBe(el(fixture, ClassElement.Data));

    });

    it('should display reloader at below position', () => {

      component.changes = {
        data: true,
        error: null,
        loading: true,
      };

      component.reloadingPosition = 'below';

      fixture.detectChanges();

      const children = el(fixture, ClassElement.Container).queryAll(By.css('div'));

      expect(children[0]).toBe(el(fixture, ClassElement.Data));
      expect(children[1]).toBe(el(fixture, ClassElement.Reloading));

    });

  });

  describe('debug', () => {

    it('should display debug information', () => {

      component.changes = {
        data: {
          test: true,
        },
        error: null,
        loading: false,
      };

      component.debug = true;

      fixture.detectChanges();

      expect(el(fixture, ClassElement.Debug))
        .toBeTruthy();

      expect(el(fixture, ClassElement.Debug).nativeElement.textContent)
        .toContain(JSON.stringify(component.changes, null, 2));

    });

  });

});
