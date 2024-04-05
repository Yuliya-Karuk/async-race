import { Router } from '../../router/router';
import { checkRoute } from '../../utils/utils';
import { FooterController } from './footerController/footerController';
import { HeaderController } from './headerController/headerController';
import { MainController } from './mainController/mainController';

export class AppController {
  private headerController: HeaderController;
  private footerController: FooterController;
  public mainController: MainController;
  private body: HTMLElement;
  private router: Router;

  constructor(body: HTMLElement, router: Router) {
    this.router = router;
    this.body = body;
    this.headerController = new HeaderController(this.router);
    this.footerController = new FooterController();
    this.mainController = new MainController();
  }

  public init(): void {
    this.body.append(
      this.headerController.view.getNode(),
      this.mainController.main.getNode(),
      this.footerController.view.getNode()
    );

    this.headerController.setLinks(this.router.currentPage);
  }

  public async setPage(location: string): Promise<void> {
    this.mainController.setView(checkRoute(location));
    this.headerController.setLinks(checkRoute(location));
  }
}
