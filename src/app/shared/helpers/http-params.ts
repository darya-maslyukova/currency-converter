import { HttpParams } from '@angular/common/http';

type FormQuery = {
  // @ts-ignore
  [key: string | number]:
    | string
    | boolean
    | number
    | null
    | undefined
    | Array<number | string | boolean | null | undefined>;
};

// export function httpParams(query: FormQuery): HttpParams {
export function httpParams(query: any): HttpParams {
  let params: HttpParams = new HttpParams();
  const cleanQueryParams = {};

  for (const key of Object.keys(query)) {
    // @ts-ignore
    let value = query[key];
    if (value === true) {
      value = 1;
    } else if (value === false) {
      value = 0;
    }

    if (value != null) {
      if (value instanceof Array) {
        value.forEach((item) => {
          params = params.append(key, item);
        });
      } else {
        params = params.append(key.toString(), value as string);
      }
    }
  }
  return params;
}

