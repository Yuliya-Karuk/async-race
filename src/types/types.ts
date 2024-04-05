export type Callback<T> = (attr: T) => void | Promise<void>;

export type QueryParams = {
  _page?: string;
  _limit?: string;
  status?: string;
  id?: string;
  _sort?: string;
  _order?: string;
};
