import logoPath from '../../img/logo.png';
import { Routes } from '../../router/router.types';
import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import styles from './header.module.scss';

export class Header extends BaseComponent{
  private gameName:string = 'Race';
  public winnersLink: HTMLAnchorElement;
  public garageLink: HTMLAnchorElement;

  constructor() {
    super('header', [styles.header]);

    this.createContent();
  }

  private createContent(): void {
    const headerWrapper = createElementWithProperties('div', [styles.headerWrapper]);

    const headerLogo = createElementWithProperties('div', [styles.headerLogo], undefined, undefined, [
      createElementWithProperties('img', [], {
        alt: 'logo image',
        src: `${logoPath}`,
      }),
      createElementWithProperties('h1', [styles.headerTitle], undefined, [{ innerText: `${this.gameName}` }]),
    ]);

    this.winnersLink = createElementWithProperties('a', ['btn'], { href: Routes.Winners }, [{ innerText: `Winners` }]);
    this.garageLink = createElementWithProperties('a', ['btn'], { href: Routes.Garage }, [{ innerText: `Garage` }]);

    headerWrapper.append(headerLogo, this.winnersLink, this.garageLink)
    this.node.append(headerWrapper);
  }

  public setLinks(page: Routes): void {
    [this.winnersLink, this.garageLink].forEach(link => link.classList.remove('btn_hidden'));

    if(page === Routes.Winners) {
      this.winnersLink.classList.add('btn_hidden');
    } else {
      this.garageLink.classList.add('btn_hidden');
    }
  }
}