import { Callback } from '../types/types';
import { CheckRoute } from '../utils/utils';
import { Routes } from './router.types';

export class Router {
  private setPage: Callback<string>;
  public currentPage: Routes;

  constructor(setPageContent: Callback<string>) {
    this.setPage = setPageContent;
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation(): void {
    this.currentPage = CheckRoute(window.location.pathname);
    this.setPage(this.currentPage);
  }

  public navigateTo(location: string): void {
    window.history.pushState({}, '', location);
    this.setPage(location);
  }
}
