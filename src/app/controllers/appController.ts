import { Router } from '../../router/router';
import { CheckRoute } from '../../utils/utils';
import { HeaderController } from './headerController/headerController';
import { MainController } from './mainController/mainController';

export class AppController {
  private headerController: HeaderController;
  public mainController: MainController;
  private body: HTMLElement;
  private router: Router;
  // private page: Routes;

  constructor(body: HTMLElement, router: Router) {
    // this.page = Routes.Winners;
    this.router = router;
    this.body = body;
    this.headerController = new HeaderController(this.router);
    this.mainController = new MainController();
  }

  public init(): void {
    this.body.append(this.headerController.view.getNode());
    this.body.append(this.mainController.main.getNode());
    this.headerController.setLinks(this.router.currentPage);
  }

  // public async setPage(location: string): Promise<void> {
  //   switch (location) {
  //     case Routes.Winners:
  //       const { Winners } = await import('../../pages/winners/winners');
  //       this.controller.main.setContent(new Winners());
  //       break;
  //     default:
  //       const { Garage } = await import('../../pages/garage/garage');
  //       this.controller.main.setContent(new Garage());
  //   }

  //   this.headerController.setLinks(CheckRoute(location));
  // }

  public async setPage(location: string): Promise<void> {
    this.mainController.setView(CheckRoute(location));
    this.headerController.setLinks(CheckRoute(location));
  }
}
