import { StatusCodes } from 'http-status-codes';
import { buildURL } from '../../utils/buildUrl';
import { BASE_URL } from '../../utils/constants';
import { UpdateWinner, Winner, WinnersResponse } from '../models/winner';

export class WinnersService {
  private winnersEndpoint: string = 'winners';
  private winnersPerPage: string = '10';
  private baseUrl: string = BASE_URL;

  public async getWinners(pageNumber: number, sortBy: string, order: string): Promise<WinnersResponse> {
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
      const winnersTotal = Number(response.headers.get('X-Total-Count'));

      return { data: winners, totalCount: winnersTotal };
    } catch {
      throw Error('Error');
    }
  }

  public async getWinner(carId: number): Promise<Winner | null> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint, String(carId)]);

    const response = await fetch(url);
    if (response.status === StatusCodes.NOT_FOUND) {
      return null;
    }
    const winner: Winner = await response.json();
    return winner;
  }

  public async updateWinner(carId: number, winnerData: UpdateWinner): Promise<Winner> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint, String(carId)]);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerData),
    });

    const updatedWinner: Winner = await response.json();
    return updatedWinner;
  }

  public async createWinner(winnerData: Winner): Promise<Winner> {
    const url = buildURL([this.baseUrl, this.winnersEndpoint]);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(winnerData),
    });

    const createdCar: Winner = await response.json();
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

export const WinnersApi = new WinnersService();
