import { BaseComponent } from '../baseComponent';
import styles from './main.module.scss';

export class Main extends BaseComponent {
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
