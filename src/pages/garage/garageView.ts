import { BaseComponent } from '../../components/baseComponent';
import { Toolbar } from '../../components/toolbar/toolbar';
import { createElementWithProperties } from '../../utils/utils';
import styles from './garage.module.scss';

export class GarageView extends BaseComponent {
  public carsBlock: HTMLDivElement;
  public toolbar: Toolbar;

  constructor() {
    super('div', [styles.garage]);
    this.toolbar = new Toolbar();
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
}
