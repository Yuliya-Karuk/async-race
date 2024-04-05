import { PaginatedDataset } from '../../types/interfaces';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinner extends Omit<Winner, 'id'> {}

export type WinnersResponse = PaginatedDataset<Winner>;
