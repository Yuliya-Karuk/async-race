import { TCar } from '../../types/types';
import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import { SVGComponent } from '../svgComponent/svgComponent';
import styles from './car.module.scss';

export class Car extends BaseComponent {
  private name: string;
  private color: string;
  private id: number;
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
    this.createCarControls();
    this.createCarTrack();
  }

  private createCarControls(): void {
    this.carName = createElementWithProperties('h3', [styles.carName], undefined, [{ innerText: this.name }]);
    this.changeButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' }, [
      { innerText: 'Change' },
    ]);
    this.deleteButton = createElementWithProperties('button', ['btn', styles.carBtn], { type: 'button' }, [
      { innerText: 'Delete' },
    ]);
    const carControlsContainer = createElementWithProperties('div', [styles.carControls], undefined, undefined, [
      this.carName,
      this.changeButton,
      this.deleteButton,
    ]);
    this.node.append(carControlsContainer);
  }

  private createCarTrack(): void {
    this.startButton = createElementWithProperties(
      'button',
      ['btn', styles.raceBtn, 'race-btn_start'],
      { type: 'button' },
      [{ innerText: 'R' }]
    );
    this.stopButton = createElementWithProperties(
      'button',
      ['btn', styles.raceBtn, 'race-btn_stop'],
      { type: 'button' },
      [{ innerText: 'S' }]
    );
    const raceControlsContainer = createElementWithProperties('div', [styles.raceControls], undefined, undefined, [
      this.startButton,
      this.stopButton,
    ]);

    this.carSvg = new SVGComponent(this.color, this.id);
    this.carImage = createElementWithProperties('div', [styles.carImage], undefined, undefined, [
      this.carSvg.getNode(),
    ]);
    const carTrack = createElementWithProperties('div', [styles.carTrack], undefined, undefined, [
      raceControlsContainer,
      this.carImage,
    ]);

    const trackContainer = createElementWithProperties('div', [styles.trackContainer], undefined, undefined, [
      raceControlsContainer,
      carTrack,
    ]);

    this.setRaceButtons(false);
    this.node.append(trackContainer);
  }

  public moveCarImage(newValue: number): void {
    this.carImage.style.transform = `translateX(${newValue}px)`;
  }

  public setRaceButtons(isMoved: boolean): void {
    if (isMoved) {
      this.startButton.setAttribute('disabled', 'disabled');
      this.stopButton.removeAttribute('disabled');
    } else {
      this.stopButton.setAttribute('disabled', 'disabled');
      this.startButton.removeAttribute('disabled');
    }
  }

  public disableRaceButton(): void {
    this.startButton.setAttribute('disabled', 'disabled');
    this.stopButton.setAttribute('disabled', 'disabled');
  }
}
