import { CarsApi } from '../../app/model/carsDatabase';
import { WinnersApi } from '../../app/model/winnersAPI';
import { Winner } from '../../components/winner/winner';
import { TWinner } from '../../types/types';
import { WinnersView } from './winnersView';

export class Winners {
  public view: WinnersView;
  private pageNumber: number;

  constructor() {
    this.view = new WinnersView();
    this.pageNumber = 1;
  }

  public async loadPage(): Promise<void> {
    const winners = await WinnersApi.getWinners(this.pageNumber);
    console.log(winners);

    // this.view.setPagination(this.pageNumber, CarsApi.carsTotal);

    this.renderWinners(winners);
  }

  private async renderWinners(winners: TWinner[]): Promise<void> {
    this.view.destroyChildren();
    this.view.renderTableHead();

    winners.forEach(async winnerData => {
      const carData = await CarsApi.getCar(winnerData.id);
      const winner = new Winner(winnerData, carData);
      this.view.appendChildren([winner.getNode()]);
    });
  }
}
