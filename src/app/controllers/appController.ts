import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { Router } from '../../router/router';
import { Routes } from '../../router/router.types';
import { CheckRoute, checkEventTarget } from '../../utils/utils';

export class AppController {
  private header: Header;
  private body: HTMLElement;
  public main: Main;
  private router: Router;
  private page: Routes;

  constructor(body: HTMLElement, router: Router) {
    this.page = Routes.Winners;
    this.router = router;
    this.body = body;
    this.header = new Header();
    this.header = new Header();
    this.main = new Main();
  }

  public init(): void {
    this.body.append(this.header.getNode());
    this.body.append(this.main.getComponent());
    this.header.setLinks(this.router.currentPage);
    this.bindListeners();
  }

  private bindListeners(): void {
    this.header.winnersLink.addEventListener('click', (e: Event) => this.handleClick(e));
    this.header.garageLink.addEventListener('click', (e: Event) => this.handleClick(e));
  }

  private handleClick(e: Event): void {
    e.preventDefault();
    const location = checkEventTarget(e.target).getAttribute('href') || '/';
    this.router.navigateTo(location);

    this.page = CheckRoute(location);
    this.setHeadersLinks(this.page);
  }

  public setHeadersLinks(page: Routes) {
    this.header.setLinks(page);
  }
}
