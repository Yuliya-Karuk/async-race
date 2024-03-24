import { Router } from '../router/router';
import { AppController } from './controllers/appController';

export class App {
  private router: Router;
  private controller: AppController;

  constructor(body: HTMLElement) {
    this.router = new Router(this.setPageContent.bind(this));
    this.controller = new AppController(body, this.router);
  }

  public init(): void {
    this.controller.init();
    this.router.handleLocation();
  }

  private setPageContent(location: string): void {
    this.controller.setPage(location);
  }
}
