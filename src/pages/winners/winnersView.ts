import { BaseComponent } from '../../components/baseComponent';
import { createElementWithProperties } from '../../utils/utils';
import styles from './winners.module.scss';

const tableColumns = {
  1: 'ID',
  2: 'Car',
  3: 'Name',
  4: 'Winnings',
  5: 'Best time (s)',
};

export class WinnersView extends BaseComponent {
  public carsBlock: HTMLDivElement;

  constructor() {
    super('div', [styles.winners]);
  }

  public renderTableHead(): void {
    const tableHead = createElementWithProperties('div', [styles.winnersRow, 'winners-row_head']);

    Object.values(tableColumns).forEach(col => {
      const column = createElementWithProperties('div', [styles.winnersColumn], undefined, [{ innerText: col }]);
      tableHead.append(column);
    });

    this.appendChildren([tableHead]);
  }
}
