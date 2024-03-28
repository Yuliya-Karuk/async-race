export type Callback<T> = (attr: T) => void | Promise<void>;

export type QueryParams = {
  _page?: string;
  _limit?: string;
  status?: string;
  id?: string;
  _sort?: string;
  _order?: string;
};

export type TCar = {
  id: number;
  name: string;
  color: string;
};

export type TEngine = {
  velocity: number;
  distance: number;
};

// export type CarsPageParams = {
//   pageNumber?: number;
//   carsPerPage?: number;
// };

export type TWinner = {
  id: number;
  wins: number;
  time: number;
};
