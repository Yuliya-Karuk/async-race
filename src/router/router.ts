import { Callback } from '../types/types';
import { CheckRoute } from '../utils/utils';
import { Routes } from './router.types';

export class Router {
  private setPage: Callback<string>;
  public currentPage: Routes;

  constructor(setPageContent: Callback<string>) {
    this.setPage = setPageContent;
    window.onhashchange = (): void => {
      this.handleLocation();
    };
    window.onload = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation(): void {
    const route = window.location.hash;
    this.currentPage = CheckRoute(route);

    this.setPage(this.currentPage);
  }

  public navigateTo(location: string): void {
    window.history.pushState({}, '', location);
    this.setPage(location);
  }
}
