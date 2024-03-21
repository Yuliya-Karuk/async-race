import { Garage } from '../../pages/garage/garage';
import { Winners } from '../../pages/winners/winners';
import { createElementWithProperties } from '../../utils/utils';

export class Main {
  private element: HTMLElement;

  constructor() {
    this.element = createElementWithProperties('main', 'main');
  }

  public setContent(component: Garage | Winners): void {
    const element = component.getComponent();
    if (this.element.children.length === 0) {
      this.element.append(element);
    } else {
      this.element.replaceChildren(element);
    }
  }

  public getComponent(): HTMLElement {
    return this.element;
  }
}
