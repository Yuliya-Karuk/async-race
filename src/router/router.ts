import { Callback } from '../types/types';
import { CheckRoute } from '../utils/utils';
import { Routes } from './router.types';

export class Router {
  private setContent: Callback<string>;
  public currentPage: Routes;

  constructor(setMainContent: Callback<string>) {
    this.setContent = setMainContent;
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation(): void {
    this.currentPage = CheckRoute(window.location.pathname);
    this.setContent(this.currentPage);
  }

  public navigateTo(location: string): void {
    window.history.pushState({}, '', location);
    this.setContent(location);
  }
}
