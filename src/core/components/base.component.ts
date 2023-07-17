import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AppInjector } from '../app.injector';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  protected onDestroy$ = new Subject<boolean>();
  protected subscriptions = new Subscription();
  protected isApp = false;
  protected router: Router;

  constructor() {
    const injector = AppInjector.getInjector();
    this.router = injector.get(Router);
    this.isApp = document.URL.indexOf('http') !== 0;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
