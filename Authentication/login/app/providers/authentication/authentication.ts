import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Authentication {

  constructor(private http: Http) {
  }

  authenticatenow(value) {
        console.log('authenticatenow ' + value.username + ' ' + value.password);
        var headers = new Headers();
        let body = JSON.stringify({ name: value.username, password: value.password });

        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3333/authenticate', body, {headers: headers})
        .map(Response => Response.json())
    } 
}

