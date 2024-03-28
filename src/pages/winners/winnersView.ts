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
  public winnersBlock: HTMLDivElement;
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
      const column = createElementWithProperties('div', [styles.winnersColumn], undefined, [{ innerText: col }]);
      tableHead.append(column);
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
}
