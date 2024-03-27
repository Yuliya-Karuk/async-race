import { TCar, TEngine } from '../../types/types';
import { buildURL } from '../../utils/buildUrl';
import { BaseUrl } from '../../utils/constants';

export class CarsDatabase {
  private garageEndpoint: string = 'garage';
  private engineEndpoint = 'engine';
  private carsPerPage: string = '7';
  private baseUrl: string = BaseUrl;
  public carsTotal: number;

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

  public async createCar(carData: Omit<TCar, 'id'>): Promise<TCar> {
    const url = buildURL([this.baseUrl, this.garageEndpoint]);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(carData),
      });

      const createdCar: TCar = await response.json();
      return createdCar;
    } catch {
      throw Error('Error');
    }
  }

  public async updateCar(carId: number, carNewData: Partial<TCar>): Promise<TCar> {
    const url = buildURL([this.baseUrl, this.garageEndpoint, String(carId)]);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carNewData),
      });

      const updatedCar: TCar = await response.json();
      return updatedCar;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async deleteCar(carId: number): Promise<Response> {
    const url = buildURL([this.baseUrl, this.garageEndpoint, String(carId)]);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async startCarEngine(carId: number): Promise<TEngine> {
    const queryParams = {
      id: carId.toString(),
      status: 'started',
    };
    const url = buildURL([this.baseUrl, this.engineEndpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });
      const engineParams: TEngine = await response.json();
      return engineParams;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async driveCar(carId: number): Promise<boolean> {
    const queryParams = {
      id: carId.toString(),
      status: 'drive',
    };
    const url = buildURL([this.baseUrl, this.engineEndpoint], queryParams);

    const response = await fetch(url, {
      method: 'PATCH',
    });

    if (response.status === 500) {
      return false;
    }
    return true;
  }

  public async stopCar(carId: number): Promise<Response> {
    const queryParams = {
      id: carId.toString(),
      status: 'stopped',
    };
    const url = buildURL([this.baseUrl, this.engineEndpoint], queryParams);

    const response = await fetch(url, {
      method: 'PATCH',
    });

    return response;
  }
}

export const CarsApi = new CarsDatabase();
