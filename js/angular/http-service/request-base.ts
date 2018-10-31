import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

declare var Cookies; // from angular-cli.json

@Injectable()
export class RequestBase {
  headers = new Headers();
  noPreFlightHeaders = new Headers();

  get requestOptions(): RequestOptions {
    this.headers.set('Authorization', `Bearer ${Cookies.get('auth_token')}`);
    return new RequestOptions({
      headers: this.headers
    });
  }
  get requestOptionsNoPre(): RequestOptions {
    this.noPreFlightHeaders.set('Authorization', `Bearer ${Cookies.get('auth_token')}`);
    return new RequestOptions({
      headers: this.noPreFlightHeaders,
    });
  };

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
  }
}
