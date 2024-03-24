import { Garage } from '../../pages/garage/garage';
import { Winners } from '../../pages/winners/winners';
import { BaseComponent } from '../baseComponent';
import styles from './main.module.scss';

export class Main extends BaseComponent {
  private element: HTMLElement;

  constructor() {
    super('main', [styles.main]);
  }

  public setContent(component: Garage | Winners): void {
    const element = component.getComponent();
    if (this.element.children.length === 0) {
      this.element.append(element);
    } else {
      this.element.replaceChildren(element);
    }
  }
}
