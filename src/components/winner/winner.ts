import { TCar, TWinner } from '../../types/types';
import { createElementWithProperties } from '../../utils/utils';
import { BaseComponent } from '../baseComponent';
import { SVGComponent } from '../svgComponent/svgComponent';
import styles from './winner.module.scss';

export class Winner extends BaseComponent {
  private name: string;
  private color: string;
  private time: number;
  private id: number;
  private wins: number;

  constructor(winner: TWinner, car: TCar) {
    super('div', ['winners-row']);
    this.name = car.name;
    this.color = car.color;
    this.wins = winner.wins;
    this.time = winner.time;
    this.id = winner.id;

    this.createContent();
  }

  private createContent(): void {
    const rowId = createElementWithProperties('div', [styles.winnerId], undefined, [{ innerText: `${this.id}` }]);

    const carSvg = new SVGComponent(this.color, this.id);
    const rowImage = createElementWithProperties('div', [styles.winnerImage], undefined, undefined, [carSvg.getNode()]);

    const rowName = createElementWithProperties('div', [styles.winnerName], undefined, [{ innerText: this.name }]);
    const rowWins = createElementWithProperties('div', [styles.winnerWins], undefined, [{ innerText: `${this.wins}` }]);
    const rowTime = createElementWithProperties('div', [styles.winnerTime], undefined, [{ innerText: `${this.time}` }]);

    this.appendChildren([rowId, rowImage, rowName, rowWins, rowTime]);
  }
}
