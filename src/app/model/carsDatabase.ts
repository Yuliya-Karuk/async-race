import { Car, CarsPageParams, QueryParams } from "../../types/types";
import { buildURL } from "../../utils/buildUrl";
import { BaseUrl } from "../../utils/constants";

export class CarsDatabase {
  private garageEndpoint: string = 'garage';
  private baseUrl: string = BaseUrl;

  constructor() {

  }

  public async getCars({ pageNum, carsPerPage }: CarsPageParams): Promise<Car[]> {
    let queryParams;
    if (pageNum && carsPerPage) {
      queryParams = {
        _page: pageNum.toString(),
        _limit: carsPerPage.toString(),
      };
    }
    const cars = await this.getData<Car>(this.garageEndpoint, queryParams);
    return cars;
  }

  private async getData<T>(endpoint: string, queryParams?: QueryParams): Promise<T[]> {
    const url = buildURL([this.baseUrl, endpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const entities = (await response.json()) as T[];
      return entities;
    } catch {
      throw Error('No connection');
    }
  }


}