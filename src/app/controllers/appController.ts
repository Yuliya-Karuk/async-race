import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { Router } from '../../router/router';
import { checkEventTarget } from '../../utils/utils';

export class AppController {
  private header: Header;
  private body: HTMLElement;
  public main: Main;
  private router: Router;

  constructor(body: HTMLElement, router: Router) {
    this.router = router;
    this.header = new Header();
    this.body = body;
    this.header = new Header();
    this.main = new Main();
  }

  public init(): void {
    this.body.append(this.header.getComponent());
    this.body.append(this.main.getComponent());
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
  }
}
