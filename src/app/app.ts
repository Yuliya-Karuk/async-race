import { Router } from '../router/router';
import { Routes } from '../router/router.types';
import { CheckRoute } from '../utils/utils';
import { AppController } from './controllers/appController';

export class App {
  private router: Router;
  private controller: AppController;

  constructor(body: HTMLElement) {
    this.router = new Router(this.setMainContent.bind(this));
    this.controller = new AppController(body, this.router);
  }

  public init(): void {
    this.controller.init();
    this.router.handleLocation();
  }

  private async setMainContent(location: string): Promise<void> {
    switch (location) {
      case Routes.Winners:
        const { Winners } = await import('../pages/winners/winners');
        this.controller.main.setContent(new Winners());
        break;
      default:
        const { Garage } = await import('../pages/garage/garage');
        this.controller.main.setContent(new Garage());
    }

    this.controller.setHeadersLinks(CheckRoute(location));
  }
}
