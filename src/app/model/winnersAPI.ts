import { TWinner } from '../../types/types';
import { buildURL } from '../../utils/buildUrl';
import { BaseUrl } from '../../utils/constants';

export class WinnersDatabase {
  private winnersEndpoint: string = 'winners';
  private winnersPerPage: string = '10';
  private baseUrl: string = BaseUrl;
  public winnersTotal: number;

  public async getWinners(pageNumber: number, sortBy: string = 'time', order: string = 'ASC'): Promise<TWinner[]> {
    const queryParams = {
      _page: pageNumber.toString(),
      _limit: this.winnersPerPage,
      _sort: sortBy,
      _order: order,
    };
    const url = buildURL([this.baseUrl, this.winnersEndpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const winners = await response.json();
      this.winnersTotal = Number(response.headers.get('X-Total-Count'));
      return winners;
    } catch {
      throw Error('Error');
    }
  }

  public async getWinner(carId: number): Promise<TWinner | null> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint, String(carId)]);

    const response = await fetch(url);
    if (response.status === 404) {
      return null;
    }
    const winner: TWinner = await response.json();
    return winner;
  }

  public async updateWinner(carId: number, winnerNewData: Omit<TWinner, 'id'>): Promise<TWinner> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint, String(carId)]);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerNewData),
    });

    const updatedWinner: TWinner = await response.json();
    return updatedWinner;
  }

  public async createWinner(winnerData: TWinner): Promise<TWinner> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint]);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(winnerData),
    });

    const createdCar: TWinner = await response.json();
    return createdCar;
  }

  public async deleteWinner(carId: number): Promise<Response> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint, String(carId)]);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      throw Error('Error');
    }
  }
}

export const WinnersApi = new WinnersDatabase();
