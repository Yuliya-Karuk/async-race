import { QueryParams } from "../types/types";

function buildQueryParams(queryParams: QueryParams): string {
  let params = '';

  for (const [key, value] of Object.entries(queryParams)) {
    params += `&${key}=${value}`;
  }
  return params.slice(1);
}

export function buildURL(path: string[], queryParams?: QueryParams): string {
  let url = path.join('/');
  let params = '';

  if (queryParams) {
    params = buildQueryParams(queryParams);
  }
  return `${url}?${params}`;
}
