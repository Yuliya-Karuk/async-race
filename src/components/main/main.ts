import { BaseComponent } from '../baseComponent';
import styles from './main.module.scss';

export class Main extends BaseComponent {
  private element: HTMLElement;

  constructor() {
    super('main', [styles.main]);
  }

  public setContent(component: HTMLElement): void {
    if (this.node.children.length === 0) {
      this.appendChildren([component]);
    } else {
      this.node.replaceChildren(component);
    }
  }
}
