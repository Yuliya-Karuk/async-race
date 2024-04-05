import { StatusCodes } from 'http-status-codes';
import { buildURL } from '../../utils/buildUrl';
import { BASE_URL } from '../../utils/constants';
import { Car, CarsResponse, CreateCar, UpdateCar } from '../models/car';
import { Engine } from '../models/engine';

export class CarsService {
  private garageEndpoint: string = 'garage';
  private engineEndpoint = 'engine';
  private carsPerPage: string = '7';
  private baseUrl: string = BASE_URL;

  public async getCars(pageNumber: number): Promise<CarsResponse> {
    const queryParams = {
      _page: pageNumber.toString(),
      _limit: this.carsPerPage,
    };
    const url = buildURL([this.baseUrl, this.garageEndpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const cars: Car[] = await response.json();
      const carsTotal = Number(response.headers.get('X-Total-Count'));

      return { data: cars, totalCount: carsTotal };
    } catch (error) {
      throw Error('Error');
    }
  }

  public async getCar(carId: number): Promise<Car> {
    const url = buildURL([this.baseUrl, this.garageEndpoint, String(carId)]);

    try {
      const response = await fetch(url);
      const car: Car = await response.json();
      return car;
    } catch (error) {
      throw Error('NOT FOUND');
    }
  }

  public async createCar(carData: CreateCar): Promise<Car> {
    const url = buildURL([this.baseUrl, this.garageEndpoint]);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(carData),
      });

      const createdCar: Car = await response.json();
      return createdCar;
    } catch {
      throw Error('Error');
    }
  }

  public async updateCar(carId: number, carData: UpdateCar): Promise<Car> {
    const url = buildURL([this.baseUrl, this.garageEndpoint, String(carId)]);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const updatedCar: Car = await response.json();
      return updatedCar;
    } catch (error) {
      throw Error('NOT FOUND');
    }
  }

  public async deleteCar(carId: number): Promise<void> {
    const url = buildURL([this.baseUrl, this.garageEndpoint, String(carId)]);
    try {
      await fetch(url, {
        method: 'DELETE',
      });
    } catch (error) {
      throw Error('NOT FOUND');
    }
  }

  public async startCarEngine(carId: number): Promise<Engine> {
    const queryParams = {
      id: carId.toString(),
      status: 'started',
    };
    const url = buildURL([this.baseUrl, this.engineEndpoint], queryParams);

    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });
      const engineParams: Engine = await response.json();
      return engineParams;
    } catch (error) {
      throw Error('NOT FOUND');
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

    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      return false;
    }

    return true;
  }

  public async stopCar(carId: number): Promise<void> {
    const queryParams = {
      id: carId.toString(),
      status: 'stopped',
    };
    const url = buildURL([this.baseUrl, this.engineEndpoint], queryParams);

    try {
      await fetch(url, {
        method: 'PATCH',
      });
    } catch (error) {
      throw Error('NOT FOUND');
    }
  }
}

export const CarsApi = new CarsService();
