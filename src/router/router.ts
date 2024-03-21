import { Callback } from '../types/types';

export class Router {
  private setContent: Callback<string>;

  constructor(setMainContent: Callback<string>) {
    this.setContent = setMainContent;
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation(): void {
    const currentPage = window.location.pathname;
    this.setContent(currentPage);
  }

  public navigateTo(location: string): void {
    window.history.pushState({}, '', location);
    this.setContent(location);
  }
}
