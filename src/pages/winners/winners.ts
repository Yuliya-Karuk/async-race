import { CarsApi } from '../../app/api/cars';
import { WinnersApi } from '../../app/api/winners';
import { Winner } from '../../app/models/winner';
import { WinnerView } from '../../components/winner/winner';
import { Order, SortBy } from '../../types/enums';
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
    const { data, totalCount } = await WinnersApi.getWinners(this.pageNumber, this.sortBy, this.order);

    this.view.setPagination(this.pageNumber, totalCount);

    this.renderWinners(data);
  }

  private async renderWinners(winners: Winner[]): Promise<void> {
    this.view.cleanWinnersContainer();

    const winnersPromises = winners.map(async (winnerData, i) => {
      const winner = await this.renderOneWinner(winnerData, i);
      return winner;
    });

    const winnersCreated = await Promise.all(winnersPromises);

    winnersCreated.forEach(winner => this.view.winnersBlock.append(winner.getNode()));
  }

  private async renderOneWinner(winnerData: Winner, tableNumber: number): Promise<WinnerView> {
    const index = (this.pageNumber - 1) * 10 + tableNumber + 1;
    const carData = await CarsApi.getCar(winnerData.id);
    const winner = new WinnerView(winnerData, carData, index);
    return winner;
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
