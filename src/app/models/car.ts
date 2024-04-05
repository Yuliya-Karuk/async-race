import { PaginatedDataset } from '../../types/interfaces';

export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CreateCar extends Omit<Car, 'id'> {}

export interface UpdateCar extends Omit<Car, 'id'> {}

export type CarsResponse = PaginatedDataset<Car>;
