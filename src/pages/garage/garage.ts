import { createElementWithProperties } from '../../utils/utils';

export class Garage {
  public element: HTMLDivElement;

  constructor() {
    this.element = createElementWithProperties('div', '', undefined, [{ innerText: `Garage` }]);
  }

  public getComponent(): HTMLDivElement {
    return this.element;
  }
}
