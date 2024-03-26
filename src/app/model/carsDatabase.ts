import { TCar } from "../../types/types";
import { buildURL } from "../../utils/buildUrl";
import { BaseUrl } from "../../utils/constants";

export class CarsDatabase {
  private garageEndpoint: string = 'garage';
  private carsPerPage: string = '7';
  private baseUrl: string = BaseUrl;
  public carsTotal: number;

  constructor() {

  }

  public async getCars(pageNumber: number): Promise<TCar[]> {
    const queryParams = {
        _page: pageNumber.toString(),
        _limit: this.carsPerPage,
      };
    const url = buildURL([this.baseUrl, this.garageEndpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const cars: TCar[] = await response.json();
      this.carsTotal = Number(response.headers.get('X-Total-Count'));
      return cars;
    } catch {
      throw Error('No connection');
    }
  }

  public async createCar<T>(carData: T): Promise<T> {
    try {
      const url = buildURL([this.baseUrl, this.garageEndpoint]);
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(carData),
      });
      const createdCar: T = await response.json();
      this.carsTotal += 1;
      return createdCar;
    } catch {
      throw Error('Error');
    }
  }
}

export const CarsApi = new CarsDatabase();