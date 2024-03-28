import { BaseComponent } from '../../components/baseComponent';
import { Modal } from '../../components/modal/modal';
import { Toolbar } from '../../components/toolbar/toolbar';
import { createElementWithProperties } from '../../utils/utils';
import styles from './garage.module.scss';

export class GarageView extends BaseComponent {
  public carsBlock: HTMLDivElement;
  public toolbar: Toolbar;
  public modal: Modal;

  constructor() {
    super('div', [styles.garage]);
    this.toolbar = new Toolbar();
    this.modal = new Modal();
  }

  public createToolbar(): void {
    this.toolbar.renderControlBlock();
    this.appendChildren([this.toolbar.getNode()]);
  }

  public createCarsContainer(): void {
    this.carsBlock = createElementWithProperties('div', [styles.cars]);
    this.appendChildren([this.carsBlock]);
  }

  public cleanCarsContainer(): void {
    this.carsBlock.replaceChildren();
  }

  public createModal(): void {
    document.body.insertAdjacentElement('beforeend', this.modal.getNode());
  }
}
