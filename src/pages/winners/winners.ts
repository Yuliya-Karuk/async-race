import { createElementWithProperties } from '../../utils/utils';

export class Winners {
  public element: HTMLDivElement;

  constructor() {
    this.element = createElementWithProperties('div', '', undefined, [{ innerText: `Winners` }]);
  }

  public getComponent(): HTMLDivElement {
    return this.element;
  }
}
