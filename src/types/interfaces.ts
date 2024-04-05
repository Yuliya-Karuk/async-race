export interface Props {
  tag: string;
  className: string;
  text?: string;
  attr?: object;
}

export interface DomElementAttribute {
  [key: string]: string;
}

export interface DomElementProperties {
  [key: string]: string;
}

export interface CarBrand {
  brand: string;
  models: string[];
}

export interface FirstFinisher {
  id: number;
  startTime: number;
}

export interface Dataset<T> {
  data: T[];
}

export interface PaginatedDataset<T> extends Dataset<T> {
  totalCount: number;
}
