import { TCar } from '../../types/types';
import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import { SVGComponent } from '../svgComponent/svgComponent';
import styles from './car.module.scss';

export class Car extends BaseComponent{
  public name: string;
  public color: string;
  public id: number;
  public winnersLink: HTMLAnchorElement;
  public garageLink: HTMLAnchorElement;
  public carName: HTMLHeadingElement;
  public changeButton: HTMLButtonElement;
  public deleteButton: HTMLButtonElement;
  public startButton: HTMLButtonElement;
  public stopButton: HTMLButtonElement;
  public carImage: HTMLDivElement;
  public carSvg: SVGComponent;

  constructor(car: TCar) {
    super('div', [styles.car]);
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;

    this.createContent();
  }

  private createContent(): void {
    this.createRaceControls();
    this.createCarTrack();
    this.createCarControls();
  }

  private createRaceControls(): void {
    this.startButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' },
      [{ innerText: 'Start' }]);
    this.stopButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' },
      [{ innerText: 'Stop' }]);
    const raceControlsContainer = createElementWithProperties('div', [styles.raceControls], undefined, undefined, [
      this.startButton,
      this.stopButton,
    ]);
    this.node.append(raceControlsContainer);
  }

  private createCarControls(): void {
    this.carName = createElementWithProperties('h3', [styles.carName], undefined, [{ innerText: this.name }]);
    this.changeButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' },
      [{ innerText: 'Change' }]);
    this.deleteButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' },
      [{ innerText: 'Delete' }]);
    const carControlsContainer = createElementWithProperties('div', [styles.carControls], undefined, undefined, [
      this.carName,
      this.changeButton,
      this.deleteButton,
    ]);
    this.node.append(carControlsContainer);
  }

  private createCarTrack(): void {
    this.carSvg = new SVGComponent(this.color, this.id);
    this.carImage = createElementWithProperties('div', [styles.carImage], undefined, undefined, [
      this.carSvg.getNode(),
    ]);
    const carTrack = createElementWithProperties('div', [styles.carTrack], undefined, undefined,
      [this.carImage]);
    this.node.append(carTrack);
  }
}
