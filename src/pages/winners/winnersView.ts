import { BaseComponent } from '../../components/baseComponent';
import { Order, SortBy } from '../../types/enums';
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
  public winnersBlock: HTMLDivElement;

  public timeHead: HTMLDivElement;
  public winsHead: HTMLDivElement;
  public winsOrderIcon: HTMLSpanElement;
  public timeOrderIcon: HTMLSpanElement;

  public pgnNext: HTMLButtonElement;
  public pgnText: HTMLParagraphElement;
  public pgnPrevious: HTMLButtonElement;
  private total: HTMLHeadingElement;

  constructor() {
    super('div', [styles.winners]);
  }

  public createTableHead(): void {
    const tableHead = createElementWithProperties('div', [styles.winnersRow, 'winners-row_head']);

    Object.values(tableColumns).forEach(col => {
      if (col === tableColumns[4]) {
        this.winsOrderIcon = createElementWithProperties('span', [styles.orderIcon]);
        this.winsHead = createElementWithProperties(
          'div',
          [styles.winnersColumn],
          undefined,
          [{ innerText: col }],
          [this.winsOrderIcon]
        );
        tableHead.append(this.winsHead);
      } else if (col === tableColumns[5]) {
        this.timeOrderIcon = createElementWithProperties('span', [styles.orderIcon]);
        this.timeHead = createElementWithProperties(
          'div',
          [styles.winnersColumn, 'winners-column_sorted_asc'],
          undefined,
          [{ innerText: col }],
          [this.timeOrderIcon]
        );
        tableHead.append(this.timeHead);
      } else {
        const column = createElementWithProperties('div', [styles.winnersColumn], undefined, [{ innerText: col }]);
        tableHead.append(column);
      }
    });

    this.appendChildren([tableHead]);
  }

  public renderPagination(): void {
    this.pgnNext = createElementWithProperties(
      'button',
      ['btn', 'pgn-button', 'pgn-button_next'],
      { type: 'button' },
      undefined,
      [createElementWithProperties('span', ['pgn-icon'])]
    );

    this.pgnPrevious = createElementWithProperties(
      'button',
      ['btn', 'pgn-button', 'pgn-button_previous'],
      { type: 'button' },
      undefined,
      [createElementWithProperties('span', ['pgn-icon'])]
    );

    this.pgnText = createElementWithProperties('p', ['pgn-text']);
    this.total = createElementWithProperties('h4', ['pgn-total']);

    const pgnContainer = createElementWithProperties('div', ['pgn-container'], undefined, undefined, [
      this.pgnPrevious,
      this.pgnText,
      this.pgnNext,
      this.total,
    ]);
    this.appendChildren([pgnContainer]);
  }

  public setPagination(currentPage: number, carsCount: number): void {
    this.pgnNext.removeAttribute('disabled');
    this.pgnPrevious.removeAttribute('disabled');

    const pagesCount = Math.ceil(carsCount / 10);

    this.pgnText.innerText = `${currentPage} / ${pagesCount}`;
    this.total.innerText = `Winners total: ${carsCount}`;

    if (currentPage === 1) {
      this.pgnPrevious.setAttribute('disabled', 'disabled');
    }

    if (currentPage === pagesCount) {
      this.pgnNext.setAttribute('disabled', 'disabled');
    }
  }

  public createWinnersContainer(): void {
    this.winnersBlock = createElementWithProperties('div', [styles.winnersContent]);
    this.appendChildren([this.winnersBlock]);
  }

  public cleanWinnersContainer(): void {
    this.winnersBlock.replaceChildren();
  }

  public setSortingColumns(sortBy: SortBy, order: Order): void {
    this.winsHead.className = styles.winnersColumn;
    this.timeHead.className = styles.winnersColumn;
    if (sortBy === SortBy.time) {
      this.timeHead.classList.add(`winners-column_sorted_${order.toLowerCase()}`);
    } else {
      this.winsHead.classList.add(`winners-column_sorted_${order.toLowerCase()}`);
    }
  }
}
