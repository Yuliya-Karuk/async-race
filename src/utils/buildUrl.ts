import { QueryParams } from '../types/types';

function buildQueryParams(queryParams: QueryParams): string {
  const params = Object.entries(queryParams)
    .map(([key, value]) => `&${key}=${value}`)
    .join('');

  return params.slice(1);
}

export function buildURL(path: string[], queryParams?: QueryParams): string {
  const url = path.join('/');
  let params = '';

  if (queryParams) {
    params = buildQueryParams(queryParams);
  }
  return `${url}?${params}`;
}
