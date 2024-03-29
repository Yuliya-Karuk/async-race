import { CarsApi } from '../../app/model/carsDatabase';
import { WinnersApi } from '../../app/model/winnersAPI';
import { Winner } from '../../components/winner/winner';
import { Order, SortBy } from '../../types/enums';
import { TWinner } from '../../types/types';
import { switchOrder, switchSort } from '../../utils/utils';
import { WinnersView } from './winnersView';

export class Winners {
  public view: WinnersView;
  private pageNumber: number;
  private sortBy: SortBy = SortBy.time;
  private order: Order = Order.ASC;

  constructor() {
    this.view = new WinnersView();
    this.pageNumber = 1;

    this.renderStaticParts();
  }

  private renderStaticParts(): void {
    this.view.createTableHead();
    this.view.createWinnersContainer();
    this.view.renderPagination();
    this.bindPaginationListeners();
    this.bindSortingListeners();
  }

  private bindPaginationListeners(): void {
    this.view.pgnNext.addEventListener('click', () => this.handlePagination(1));
    this.view.pgnPrevious.addEventListener('click', () => this.handlePagination(-1));
  }

  private bindSortingListeners(): void {
    this.view.winsHead.addEventListener('click', () => this.handleSorting(SortBy.wins));
    this.view.timeHead.addEventListener('click', () => this.handleSorting(SortBy.time));
  }

  public async loadPage(): Promise<void> {
    const winners = await WinnersApi.getWinners(this.pageNumber, this.sortBy, this.order);

    this.view.setPagination(this.pageNumber, WinnersApi.winnersTotal);

    this.renderWinners(winners);
  }

  private async renderWinners(winners: TWinner[]): Promise<void> {
    this.view.cleanWinnersContainer();

    winners.forEach(async (winnerData, i) => {
      const index = (this.pageNumber - 1) * 10 + i + 1;
      const carData = await CarsApi.getCar(winnerData.id);
      const winner = new Winner(winnerData, carData, index);
      this.view.winnersBlock.append(winner.getNode());
    });
  }

  private handlePagination(direction: number): void {
    this.pageNumber += direction;
    this.loadPage();
  }

  private async handleSorting(chosenSort: SortBy): Promise<void> {
    if (
      (this.sortBy === SortBy.wins && chosenSort === SortBy.wins) ||
      (this.sortBy === SortBy.time && chosenSort === SortBy.time)
    ) {
      this.order = switchOrder(this.order);
    } else if (
      (this.sortBy === SortBy.time && chosenSort === SortBy.wins) ||
      (this.sortBy === SortBy.wins && chosenSort === SortBy.time)
    ) {
      this.sortBy = switchSort(this.sortBy);
      this.order = Order.ASC;
    }

    this.view.setSortingColumns(this.sortBy, this.order);
    await this.loadPage();
  }
}
