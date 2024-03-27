import { Header } from '../../../components/header/header';
import { Router } from '../../../router/router';
import { Routes } from '../../../router/router.types';
import { CheckRoute, checkEventTarget } from '../../../utils/utils';

export class HeaderController {
  public view: Header;
  private page: Routes;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
    this.page = Routes.Winners;
    this.view = new Header();

    this.bindListeners();
  }

  private bindListeners(): void {
    this.view.winnersLink.addEventListener('click', (e: Event) => this.handleClick(e));
    this.view.garageLink.addEventListener('click', (e: Event) => this.handleClick(e));
  }

  private handleClick(e: Event): void {
    e.preventDefault();
    const location = checkEventTarget(e.target).getAttribute('href') || '/';
    this.router.navigateTo(location);

    this.page = CheckRoute(location);
    this.setLinks(this.page);
  }

  public setLinks(page: Routes): void {
    this.view.setLinks(page);
  }
}
