import { KeyQueryParam } from "./enums";

export type Callback<T> = (attr: T) => void | Promise<void>;

export type QueryParams = {
  [K in keyof typeof KeyQueryParam]: string;
};

export type TCar = {
  id: number;
  name: string;
  color: string;
};

export type CarsPageParams = {
  pageNum?: number;
  carsPerPage?: number;
};