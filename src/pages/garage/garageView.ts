import { BaseComponent } from '../../components/baseComponent';
import { createElementWithProperties } from '../../utils/utils';
import styles from './garage.module.scss';

export class GarageView extends BaseComponent{
  public carsBlock: HTMLDivElement;

  constructor() {
    super('div', [styles.garage]);
  }

  public createCarsContainer(): void {
    this.carsBlock = createElementWithProperties('div', [styles.cars]);
    this.appendChildren([this.carsBlock]);
  }
}
