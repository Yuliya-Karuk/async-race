import { Routes } from '../../router/router.types';
import { createElementWithProperties } from '../../utils/utils';

export class Header {
  public element: HTMLElement;
  public winnersLink: HTMLAnchorElement;
  public garageLink: HTMLAnchorElement;

  constructor() {
    this.element = createElementWithProperties('header', '');
    this.createContent();
  }

  private createContent(): void {
    this.winnersLink = createElementWithProperties('a', '', { href: Routes.Winners }, [{ innerText: `Winners` }]);
    this.garageLink = createElementWithProperties('a', '', { href: Routes.Garage }, [{ innerText: `Garage` }]);
    this.element.append(this.winnersLink, this.garageLink);
  }

  public getComponent(): HTMLElement {
    return this.element;
  }
}
